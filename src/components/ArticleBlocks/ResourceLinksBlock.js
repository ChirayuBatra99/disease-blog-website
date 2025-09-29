const ResourceLinksBlock = ({ text }) => {
  // Split text by new lines
  const lines = text.split("\n")

  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        // Simple check: is this line a link?
        const isLink = line.startsWith("http")

        return isLink ? (
          <a
            key={idx}
            href={line}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 underline hover:text-blue-700"
          >
            {line}
          </a>
        ) : (
          <p key={idx} className="text-gray-800">
            {line}
          </p>
        )
      })}
    </div>
  )
}

export default ResourceLinksBlock


