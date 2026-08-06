import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import type { Message } from '../types/chat'

interface MessageListProps {
	messages: Message[]
	isTyping?: boolean
	typingLabel?: string
}

function MessageList({ messages, isTyping = false, typingLabel = 'Guest' }: MessageListProps) {
	return (
		<div className="flex-1 overflow-y-auto p-4">
			{messages.map((message) => (
				<MessageBubble
					key={message.id}
					sender={message.sender}
					content={message.content}
					timestamp={message.timestamp}
					status={message.status}
				/>
			))}
			{isTyping && <TypingIndicator label={typingLabel} />}
		</div>
	)
}

export default MessageList
