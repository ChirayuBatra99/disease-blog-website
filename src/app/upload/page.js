'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { nanoid } from 'nanoid';

const blockTypes = ['paragraph', 'heading', 'quote', 'image', 'list'];

function SortableItem({ id, block, updateBlock, removeBlock }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border rounded p-4 bg-white shadow-sm my-2"
    >
      <div className="flex justify-between mb-2 text-black">
        <strong>{block.type.toUpperCase()}</strong>
        <button
          className="text-red-500 text-sm"
          onClick={() => removeBlock(id)}
        >
          ❌
        </button>
      </div>
      <textarea
        className="w-full border p-2 rounded text-black"
        rows={block.type === 'paragraph' ? 4 : 2}
        value={block.content}
        onChange={(e) => updateBlock(id, e.target.value)}
        placeholder={`Enter content for ${block.type}`}
      />
    </div>
  );
}

export default function PublisherPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const [blockType, setBlockType] = useState('paragraph');
  const [blocks, setBlocks] = useState([]);

  const [faq, setFaq] = useState([  { question: '', answer: '' }  ]);

  const sensors = useSensors(useSensor(PointerSensor));

  const addBlock = () => {
    setBlocks((prev) => [
      ...prev,
      { id: nanoid(), type: blockType, content: '' }
    ]);
  };

  const updateBlock = (id, content) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content } : b))
    );
  };

  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((b) => b.id === active.id);
      const newIndex = blocks.findIndex((b) => b.id === over?.id);
      setBlocks((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleSubmit = async () => {
    const content_blocks = blocks.map((b) => {
      if (b.type === 'list') {
        return {
          type: 'list',
          style: 'unordered',
          items: b.content.split('\n').map((item) => item.trim()).filter(Boolean)
        };
      } else if (b.type === 'image') {
        try {
          const obj = JSON.parse(b.content);
          return {
            type: 'image',
            url: obj.url,
            caption: obj.caption || '',
            alt: obj.alt || ''
          };
        } catch {
          alert('Invalid image JSON format.');
          return null;
        }
      } else {
        return {
          type: b.type,
          ...(b.type === 'heading' ? { level: 1 } : {}),
          text: b.content
        };
      }
    }).filter(Boolean);

    const payload = {
      title,
      slug,
      tags,
      author,
      cover_image_url: coverImage,
      published: true,
      content_blocks
    };

    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const json = await res.json();
    if (res.ok) {
      alert('Article created!');
    } else {
      alert(`Error: ${json.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">📝 Create New Article</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        placeholder="Slug (url-path)"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        className="w-full border p-2 rounded mb-2"
      />
      <input
        placeholder="Tags (comma-separated)"
        value={tagInput}
        onChange={(e) => {
          setTagInput(e.target.value);
          setTags(e.target.value.split(',').map((t) => t.trim()));
        }}
        className="w-full border p-2 rounded mb-4"
      />

      

      <div className="flex items-center gap-4 mb-4">
        <select
          value={blockType}
          onChange={(e) => setBlockType(e.target.value)}
          className="border p-2 rounded"
        >
          {blockTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addBlock}
        >
          ➕ Add Block
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} className="bg-black-100 tetx-black-900">
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block) => (
            <SortableItem
              key={block.id}
              id={block.id}
              block={block}
              updateBlock={updateBlock}
              removeBlock={removeBlock}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
      >
        ✅ Submit Article
      </button>
    </div>
  );
}