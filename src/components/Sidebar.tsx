import { useState } from 'react'
import SearchBar from './SearchBar'
import ConversationItem from './ConversationItem'
import type { Conversation } from '../types/chat'

interface SidebarProps {
  conversations: Conversation[]
  selectedConversationId: string
  onSelectConversation: (conversationId: string) => void
}

function Sidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter((conversation) => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) {
      return true
    }

    return (
      conversation.guestName.toLowerCase().includes(query) ||
      conversation.lastMessage.toLowerCase().includes(query)
    )
  })

  return (
    <aside className="w-80 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">Conversations</h1>
      </div>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            guestName={conversation.guestName}
            lastMessage={conversation.lastMessage}
            unreadCount={conversation.unreadCount}
            isSelected={conversation.id === selectedConversationId}
            onClick={() => onSelectConversation(conversation.id)}
          />
        ))}
      </div>
    </aside>
  )
}

export default Sidebar