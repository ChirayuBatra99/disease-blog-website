export default function ResourceLinksBlock({ resources }) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-[550] mb-2">Resources</h2>
      <div className="w-full h-[1px] bg-gray-300 mb-4"></div>
      {resources && resources.length > 0 ? (
        resources.map((res, i) => (
          <p key={i}>
            <strong>{res.name}</strong>:{" "}
            <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {res.link}
            </a>
          </p>
        ))
      ) : (
        <p className="text-gray-500">No resources added yet.</p>
      )}
    </div>
  );
}
