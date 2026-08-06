interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="p-3 border-b border-gray-200">
      <label htmlFor="conversation-search" className="sr-only">
        Search conversations
      </label>
      <input
        id="conversation-search"
        type="text"
        placeholder="Search conversations..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}

export default SearchBar