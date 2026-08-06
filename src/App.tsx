import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import { conversations as initialConversations } from './data/conversations'
import type { ChatMode, Conversation, Message } from './types/chat'

const incomingMessages = [
  'Thanks, that helps.',
  'Could you check one more thing?',
  'I still have one question about my booking.',
  'Perfect, I will wait here.',
]

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [selectedConversationId, setSelectedConversationId] = useState(conversations[0]?.id ?? '')
  const [typingConversationId, setTypingConversationId] = useState<string | null>(null)
  const [typingLabel, setTypingLabel] = useState('Guest')

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId,
  )

  useEffect(() => {
    if (!selectedConversation) {
      return
    }

    let timeoutId: number | undefined

    const intervalId = window.setInterval(() => {
      setTypingConversationId(selectedConversation.id)
      setTypingLabel(selectedConversation.mode === 'bot' ? 'Bot' : 'Guest')

      timeoutId = window.setTimeout(() => {
        const nextMessage = incomingMessages[Math.floor(Math.random() * incomingMessages.length)]
        const sender = selectedConversation.mode === 'bot' ? 'bot' : 'guest'

        setConversations((currentConversations) =>
          currentConversations.map((conversation) =>
            conversation.id === selectedConversation.id
              ? {
                  ...conversation,
                  messages: [
                    ...conversation.messages,
                    {
                      id: `${conversation.id}-${sender}-${Date.now()}`,
                      conversationId: conversation.id,
                      sender,
                      content: nextMessage,
                      timestamp: Date.now(),
                    },
                  ],
                  lastMessage: nextMessage,
                  unreadCount: conversation.id === selectedConversationId ? conversation.unreadCount : conversation.unreadCount + 1,
                }
              : conversation,
          ),
        )

        setTypingConversationId(null)
        setTypingLabel('Guest')
      }, 1400)
    }, 12000)

    return () => {
      window.clearInterval(intervalId)

      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }

      setTypingConversationId(null)
      setTypingLabel('Guest')
    }
  }, [selectedConversation, selectedConversationId])

  const handleTakeOverToggle = () => {
    if (!selectedConversation) {
      return
    }

    const nextMode: ChatMode = selectedConversation.mode === 'bot' ? 'human' : 'bot'

    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === selectedConversation.id
          ? { ...conversation, mode: nextMode }
          : conversation,
      ),
    )
  }

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId)

    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation,
      ),
    )
  }

  const handleSendMessage = (messageText: string) => {
    if (!selectedConversation || selectedConversation.mode !== 'human') {
      return
    }

    const messageId = `${selectedConversation.id}-${Date.now()}`
    const newMessage: Message = {
      id: messageId,
      conversationId: selectedConversation.id,
      sender: 'staff',
      content: messageText,
      timestamp: Date.now(),
      status: 'sent',
    }

    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
              lastMessage: messageText,
              unreadCount: 0,
            }
          : conversation,
      ),
    )

    window.setTimeout(() => {
      setConversations((currentConversations) =>
        currentConversations.map((conversation) => {
          if (conversation.id !== selectedConversation.id) {
            return conversation
          }

          return {
            ...conversation,
            messages: conversation.messages.map((message) =>
              message.id === messageId && message.sender === 'staff'
                ? { ...message, status: 'delivered' }
                : message,
            ),
          }
        }),
      )
    }, 1200)

    window.setTimeout(() => {
      setConversations((currentConversations) =>
        currentConversations.map((conversation) => {
          if (conversation.id !== selectedConversation.id) {
            return conversation
          }

          return {
            ...conversation,
            messages: conversation.messages.map((message) =>
              message.id === messageId && message.sender === 'staff'
                ? { ...message, status: 'read' }
                : message,
            ),
          }
        }),
      )
    }, 2600)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />

      <main className="flex-1 flex flex-col">
        {selectedConversation && (
          <>
            <ChatHeader
              guestName={selectedConversation.guestName}
              mode={selectedConversation.mode}
              onToggleMode={handleTakeOverToggle}
            />

            <MessageList
              messages={selectedConversation.messages}
              isTyping={typingConversationId === selectedConversation.id}
              typingLabel={typingLabel}
            />

            <MessageInput
              onSend={handleSendMessage}
              disabled={selectedConversation.mode !== 'human'}
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App