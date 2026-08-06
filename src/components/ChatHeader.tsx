import type { ChatMode } from '../types/chat'
import { getInitials } from '../utils/chatUtils'

interface ChatHeaderProps {
  guestName: string
  mode: ChatMode
  onToggleMode: () => void
}
function ChatHeader({ guestName, mode, onToggleMode }: ChatHeaderProps) {
  const initials = getInitials(guestName)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-500 text-white
                         flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">{guestName}</p>
          <p className={`text-xs ${mode === 'bot' ? 'text-purple-600' : 'text-green-600'}`}>
            {mode === 'bot' ? 'Bot is handling this chat' : 'Human agent active'}
          </p>
        </div>
      </div>

      {/* Take Over / Return to Bot button placeholder — wired up in Step 20-21 */}
      <button
        type="button"
        onClick={onToggleMode}
        className="text-sm font-medium px-3 py-1.5 rounded-md border border-gray-300
                   hover:bg-gray-50 transition-colors"
      >
        {mode === 'bot' ? 'Take Over' : 'Return to Bot'}
      </button>
    </div>
  )
}

export default ChatHeader