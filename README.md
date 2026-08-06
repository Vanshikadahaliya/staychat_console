# StayChat Console

StayChat Console is a simple customer support chat dashboard built with React, TypeScript, Vite, and Tailwind CSS. It is designed as an internship-friendly frontend assignment: clean, functional, easy to explain, and fully powered by local mock data.

## What the app does

- Shows a left sidebar with 100+ guest conversations.
- Lets you search conversations by guest name or last message.
- Opens the selected conversation in the main chat panel.
- Displays guest, bot, and staff messages with clear visual differences.
- Shows timestamps for every message.
- Shows staff message status as `sent`, `delivered`, and `read`.
- Supports Bot and Human handling modes per conversation.
- Lets you click `Take Over` to switch a conversation to Human mode.
- Enables the message input only in Human mode.
- Lets staff send replies that appear immediately.
- Simulates live incoming messages and a typing indicator.
- Keeps the UI responsive and lightweight.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4

## Project Structure

```text
src/
├─ App.tsx
├─ App.css
├─ index.css
├─ main.tsx
├─ assets/
├─ components/
│  ├─ Sidebar.tsx
│  ├─ SearchBar.tsx
│  ├─ ConversationItem.tsx
│  ├─ ChatHeader.tsx
│  ├─ MessageList.tsx
│  ├─ MessageBubble.tsx
│  ├─ MessageInput.tsx
│  ├─ TypingIndicator.tsx
│  ├─ ChatWindow.tsx
│  ├─ ModeToggle.tsx
├─ data/
│  └─ conversations.ts
├─ hooks/
│  └─ useChat.ts
├─ types/
│  └─ chat.ts
└─ utils/
	└─ chatUtils.ts
```

- `App.tsx` holds the main state for the selected conversation, chat mode, typing indicator, and message updates.
- `data/conversations.ts` stores the local mock inbox data.
- `types/chat.ts` defines the shared TypeScript types for conversations and messages.
- `components/` contains the UI pieces for the sidebar, chat header, message thread, typing indicator, and input.
- `hooks/useChat.ts` is present in the project structure for chat-related logic, but the app currently keeps its state simple in `App.tsx`.
- `utils/chatUtils.ts` contains small helper functions used across the UI.

## How it works

The app uses simple React state in `App.tsx`:

- one state value stores all conversations
- one state value stores the selected conversation
- one state value stores the typing indicator

When you select a conversation, the right panel updates to show that conversation's messages. When you click `Take Over`, the mode changes from Bot to Human. In Human mode, the input becomes active so staff can send a message. The app also simulates incoming replies after a short delay so the screen feels like a live support console.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

### 3. Open the app

Vite will show a local URL in the terminal. Open it in your browser.

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - type-check and build the production app
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally

## Notes

- No backend is required.
- All data is local and mock-based.
- The app is intentionally kept simple so it is easy to explain in an interview.
- The conversations list is generated locally to simulate a larger inbox.

## Demo Flow

1. Open the app.
2. Click a conversation from the sidebar.
3. Use `Take Over` to switch to Human mode.
4. Type a message and send it.
5. Watch the message status change from `sent` to `delivered` to `read`.
6. Switch back to Bot mode with `Return to Bot`.

## License

This project is for screening and demo purposes.
