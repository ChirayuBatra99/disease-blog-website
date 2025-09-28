export default function SubHeadingBlock({ level, text }) {
  // const Tag = `h${level}`; // h1, h2, h3...
  const Tag = `h3`;
  return (
  <div>
    <Tag className="text-xl font-[550] my-4">{text}</Tag>
    <div className="w-full h-[1px] bg-gray-300 mb-6"></div>
  </div>
)}
