// Who sent a given message
export type SenderType = "guest" | "bot" | "staff";

// Delivery state of a message sent by staff
export type MessageStatus = "sent" | "delivered" | "read";

// Who is currently handling a conversation
export type ChatMode = "bot" | "human";

export interface Message {
  id: string;
  conversationId: string;
  sender: SenderType;
  content: string;
  timestamp: number;
  status?: MessageStatus;
}

export interface Conversation {
  id: string;
  guestName: string;
  avatar?: string;
  lastMessage: string;
  unreadCount: number;
  mode: ChatMode;
  messages: Message[];
}