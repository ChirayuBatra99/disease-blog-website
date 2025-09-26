export default function HeadingBlock({ level, text }) {
  // const Tag = `h${level}`; // h1, h2, h3...
  const Tag = `h1`;
  return (
  <div>
    <Tag className="text-3xl font-[550] my-4">{text}</Tag>
    <div className="w-full h-[1px] bg-gray-300 mb-6"></div>
  </div>
)}


// text-${level === 1 ? '8xl' : '8xl'} text-xl 