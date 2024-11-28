import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
  onSpeakMessage: () => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onSpeakMessage }) => {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex gap-4 p-4 ${isBot ? 'bg-gray-50' : ''}`}>
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
        {isBot ? <Bot size={20} /> : <User size={20} />}
      </div>
      <div className="flex-1">
        <div className="font-medium mb-1">{isBot ? 'AI Assistant' : 'You'}</div>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        {isBot && (
          <button
            onClick={onSpeakMessage}
            className="mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Speak message
          </button>
        )}
      </div>
    </div>
  );
};