import type { SenderType, MessageStatus } from '../types/chat'

interface MessageBubbleProps {
  sender: SenderType;
  content: string;
  timestamp: number;
  status?: MessageStatus;
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function MessageStatusLabel({ status }: { status: MessageStatus }) {
  const statusClasses =
    status === 'read' ? 'text-blue-100' : 'text-blue-100/90'

  return <span className={statusClasses}>{status}</span>
}

function MessageBubble({ sender, content, timestamp, status }: MessageBubbleProps) {
  const isStaff = sender === 'staff'
  const isGuest = sender === 'guest'
  const isBot = sender === 'bot'

  return (
    <div className={`flex mb-3 ${isStaff ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm
          ${isGuest ? 'bg-white border border-gray-200 rounded-bl-sm' : ''}
          ${isBot ? 'bg-purple-100 border border-purple-200 rounded-bl-sm' : ''}
          ${isStaff ? 'bg-blue-500 text-white rounded-br-sm' : ''}
        `}
      >
        {isBot && (
          <p className="text-[11px] font-semibold text-purple-600 mb-0.5">Bot</p>
        )}

        <p className="text-sm whitespace-pre-wrap wrap-break-word">{content}</p>

        <div
          className={`flex items-center gap-1 mt-1 text-[11px]
            ${isStaff ? 'justify-end text-blue-100' : 'justify-start text-gray-400'}`}
        >
          <span>{formatTime(timestamp)}</span>
          {isStaff && status && <MessageStatusLabel status={status} />}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble