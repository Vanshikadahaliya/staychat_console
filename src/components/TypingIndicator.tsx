interface TypingIndicatorProps {
	label: string
}

function TypingIndicator({ label }: TypingIndicatorProps) {
	return (
		<div className="flex justify-start mb-3">
			<div className="max-w-[70%] rounded-2xl rounded-bl-sm border border-gray-200 bg-white px-4 py-2 shadow-sm">
				<p className="text-[11px] font-semibold text-gray-500 mb-1">{label} is typing</p>
				<div className="flex items-center gap-1">
					<span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
					<span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse [animation-delay:150ms]" />
					<span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse [animation-delay:300ms]" />
				</div>
			</div>
		</div>
	)
}

export default TypingIndicator
