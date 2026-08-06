import { useState } from 'react'

interface MessageInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

function MessageInput({ onSend, disabled = false }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    const trimmedMessage = message.trim()

    if (!trimmedMessage || disabled) {
      return
    }

    onSend(trimmedMessage)
    setMessage('')
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={
            disabled
              ? 'Take over the conversation to reply'
              : 'Type a message...'
          }
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg
                     text-sm outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-transparent disabled:bg-gray-100
                     disabled:text-gray-400 disabled:cursor-not-allowed"
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          className="px-4 py-2.5 bg-blue-500 text-white text-sm font-medium
                     rounded-lg hover:bg-blue-600 transition-colors
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default MessageInput