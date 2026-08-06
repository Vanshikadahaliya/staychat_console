interface ConversationItemProps {
  guestName: string;
  lastMessage: string;
  unreadCount: number;
  isSelected: boolean;
  onClick: () => void;
}

function ConversationItem({
  guestName,
  lastMessage,
  unreadCount,
  isSelected,
  onClick,
}: ConversationItemProps) {
  const initials = guestName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const buttonClassName = `w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100
                  hover:bg-gray-50 transition-colors
                  ${isSelected ? 'bg-blue-50' : 'bg-white'}`

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClassName}
    >
      <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white
                       flex items-center justify-center text-sm font-medium">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{guestName}</p>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>

      {unreadCount > 0 && (
        <span className="shrink-0 bg-green-500 text-white text-xs font-semibold
                          rounded-full min-w-5 h-5 flex items-center justify-center px-1.5">
          {unreadCount}
        </span>
      )}
    </button>
  )
}

export default ConversationItem