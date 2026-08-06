import type { Conversation } from '../types/chat'

const now = Date.now()

const firstNames = [
	'Rahul',
	'Priya',
	'Aman',
	'Neha',
	'Kabir',
	'Ananya',
	'Rohit',
	'Sneha',
	'Aditya',
	'Pooja',
	'Varun',
	'Isha',
	'Karan',
	'Meera',
	'Arjun',
	'Riya',
	'Dev',
	'Nidhi',
	'Harsh',
	'Tanya',
	'Mohit',
	'Simran',
	'Vikram',
	'Anika',
	'Ritesh',
	'Kavya',
	'Saurabh',
	'Lavanya',
	'Yash',
	'Harini',
]

const lastNames = [
	'Sharma',
	'Patel',
	'Verma',
	'Singh',
	'Khan',
	'Rao',
	'Mehta',
	'Iyer',
	'Nair',
	'Malhotra',
	'Gupta',
	'Kulkarni',
	'Bansal',
	'Joshi',
	'Sethi',
	'Kapoor',
	'Shah',
	'Jain',
	'Vora',
	'Chawla',
	'Choudhary',
	'Reddy',
	'Pillai',
	'Bose',
	'Das',
	'Ghosh',
	'Tripathi',
	'Yadav',
	'Kumari',
	'Menon',
]

const guestQuestions = [
	'Can I get an early check-in?',
	'Is breakfast included?',
	'What is the Wi-Fi password?',
	'Can you help with my booking?',
	'Do you offer airport pickup?',
	'Is late checkout possible?',
	'Can I extend my stay?',
	'Is the room available tomorrow?',
]

const botReplies = [
	'Sure, let me check that for you.',
	'Please share your booking ID.',
	'I can help with that right away.',
	'One moment while I look into it.',
	'Thanks, I am checking now.',
]

const staffReplies = [
	'Yes, we can arrange that for you.',
	'I have updated your request.',
	'We have noted this for you.',
	'Your booking has been reviewed.',
	'Let me know if you need anything else.',
]

function createAvatar(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase()
		.slice(0, 2)
}

function createConversation(index: number): Conversation {
	const firstName = firstNames[index % firstNames.length]
	const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length]
	const name = `${firstName} ${lastName}`
	const mode = index % 3 === 0 ? 'bot' : 'human'
	const guestMessage = guestQuestions[index % guestQuestions.length]
	const replyMessage = mode === 'bot'
		? botReplies[index % botReplies.length]
		: staffReplies[index % staffReplies.length]
	const conversationId = `c${index + 1}`
	const baseTime = now - index * 1000 * 60 * 3
	const unreadCount = index % 5 === 0 ? 2 : index % 4 === 0 ? 1 : 0

	return {
		id: conversationId,
		guestName: name,
		avatar: createAvatar(name),
		lastMessage: guestMessage,
		unreadCount,
		mode,
		messages: [
			{
				id: `${conversationId}-m1`,
				conversationId,
				sender: 'guest',
				content: guestMessage,
				timestamp: baseTime - 1000 * 60,
			},
			{
				id: `${conversationId}-m2`,
				conversationId,
				sender: mode === 'bot' ? 'bot' : 'staff',
				content: replyMessage,
				timestamp: baseTime - 1000 * 30,
				...(mode === 'human'
					? { status: index % 2 === 0 ? 'delivered' as const : 'read' as const }
					: {}),
			},
		],
	}
}

export const conversations: Conversation[] = [
	{
		id: 'c1',
		guestName: 'Rahul Sharma',
		avatar: 'RS',
		lastMessage: 'Need help with my booking',
		unreadCount: 2,
		mode: 'bot',
		messages: [
			{
				id: 'm1',
				conversationId: 'c1',
				sender: 'guest',
				content: 'Hello, I need help with my booking',
				timestamp: now - 1000 * 60 * 10,
			},
			{
				id: 'm2',
				conversationId: 'c1',
				sender: 'bot',
				content: 'Sure! Can you share your booking ID?',
				timestamp: now - 1000 * 60 * 8,
			},
			{
				id: 'm3',
				conversationId: 'c1',
				sender: 'guest',
				content: 'It is STAY-28491.',
				timestamp: now - 1000 * 60 * 6,
			},
		],
	},
	{
		id: 'c2',
		guestName: 'Priya Patel',
		avatar: 'PP',
		lastMessage: 'Thank you so much!',
		unreadCount: 0,
		mode: 'human',
		messages: [
			{
				id: 'm4',
				conversationId: 'c2',
				sender: 'guest',
				content: 'Is late checkout possible?',
				timestamp: now - 1000 * 60 * 40,
			},
			{
				id: 'm5',
				conversationId: 'c2',
				sender: 'staff',
				content: 'Yes, we can arrange that for you.',
				timestamp: now - 1000 * 60 * 36,
				status: 'read',
			},
			{
				id: 'm6',
				conversationId: 'c2',
				sender: 'guest',
				content: 'Thank you so much!',
				timestamp: now - 1000 * 60 * 34,
			},
		],
	},
	{
		id: 'c3',
		guestName: 'Aman Verma',
		avatar: 'AV',
		lastMessage: 'Is the room available tomorrow?',
		unreadCount: 1,
		mode: 'bot',
		messages: [
			{
				id: 'm7',
				conversationId: 'c3',
				sender: 'guest',
				content: 'Is the room available tomorrow?',
				timestamp: now - 1000 * 60 * 18,
			},
			{
				id: 'm8',
				conversationId: 'c3',
				sender: 'bot',
				content: 'Let me check availability for you.',
				timestamp: now - 1000 * 60 * 17,
			},
		],
	},
	...Array.from({ length: 117 }, (_, index) => createConversation(index + 3)),
]
