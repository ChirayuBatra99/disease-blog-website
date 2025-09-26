import HeadingBlock from './HeadingBlock';
import ParagraphBlock from './ParagraphBlock';
import QuoteBlock from './QuoteBlock';
import ImageBlock from './ImageBlock';
import ListBlock from './ListBlock';
import NoteCardsBlock from './NoteCardsBlock';
import ResourceLinksBlock from './ResourceLinksBlock';
import SubHeadingBlock from './SubHeadingBlock';
import SummaryBlock from './SummaryBlock';

export default function ContentRenderer({ contentBlocks }) {
  return contentBlocks.map((block, index) => {
    switch (block.type) {
      case 'heading':
        return <HeadingBlock key={index} level={block.level} text={block.text} />;
      case 'paragraph':
        return <ParagraphBlock key={index} text={block.text} />;
      case 'quote':
        return <QuoteBlock key={index} text={block.text} />;
      case 'image':
        return <ImageBlock key={index} {...block} />;
      case 'list':
        return <ListBlock key={index} items={block.items} style={block.style} />;
      case 'subheading':
        return <SubHeadingBlock key={index} text={block.text} />;
      case 'summary':
        return <SummaryBlock key={index} text={block.text} />;
      case 'notecards':
        return block.notes && block.notes.length > 0 
          ? <NoteCardsBlock key={index} notes={block.notes} />
          : null;
      case 'resourcelinks':
        return block.resources && block.resources.length > 0 
          ? <ResourceLinksBlock key={index} resources={block.resources} />
          : null; 
      default:
        return null;
    }
  });
}
