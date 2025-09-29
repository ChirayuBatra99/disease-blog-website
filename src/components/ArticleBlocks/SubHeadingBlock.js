export default function SubHeadingBlock({ level, text }) {
  // const Tag = `h${level}`; // h1, h2, h3...
  const Tag = `h3`;
  return (
  <div>
    <Tag className="text-3xl font-[550] my-4 mt-10">{text}</Tag>
  </div>
)}
