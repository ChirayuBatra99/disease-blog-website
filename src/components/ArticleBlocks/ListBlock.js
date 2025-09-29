export default function ListBlock({ items, style }) {
  const ListTag = style === 'ordered' ? 'ol' : 'ul';

  return (
    <ListTag className="list-disc marker:text-[#d26fab] marker:text-2xl list-inside my-3 space-y-1 ml-6">
      {items.map((item, i) => {
          const [boldPart, restPart] = item.split('|');
          return (
        <li key={i} className="my-5">
          <strong className="leading-7 text-gray-600 text-xl">{boldPart}</strong>
          {restPart && <span className="leading-7 text-gray-600 my-7 text-lg">{restPart}</span> }
        </li>

          ) })}
    </ListTag>
  );
}
