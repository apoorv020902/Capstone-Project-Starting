import React, { useState, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';
import { useSpeechToText } from '../hooks/useSpeechToText';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  } = useSpeechToText();

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
      resetTranscript();
      if (isListening) {
        stopListening();
      }
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={disabled}
          />
          {isSupported && (
            <button
              type="button"
              onClick={handleMicClick}
              className={`absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-200 ${
                isListening 
                  ? 'text-blue-500 hover:text-blue-600 animate-pulse shadow-lg' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mic size={20} />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};