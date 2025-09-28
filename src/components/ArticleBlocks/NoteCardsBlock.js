export default function NoteCardsBlock({ notes }) {
  return (
    <div className="my-6 flex flex-col gap-4">
      {notes && notes.length > 0 ? (
        notes.map((note, i) => (
          <div key={i} className="bg-[#EBCCDF] rounded-lg p-4">
            <h3 className="text-xl font-[550] mb-2">{note.title}</h3>
            <div className="w-full h-[1px] bg-gray-300 mb-3"></div>
            <p className="text-gray-800">{note.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notes added yet.</p>
      )}
    </div>
  );
}

