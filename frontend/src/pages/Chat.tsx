import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, User, Trash2 } from 'lucide-react';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { Message, ChatState } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { deleteUserChats, getUserChats, sendChatMessage } from '../utils/api';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/shared/LoadingSpinner';

function Chat() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const { speak, stop } = useTextToSpeech();

  const loadChats = useCallback(async () => {
    try {
      const data = await getUserChats();
      setChatState(prev => ({
        ...prev,
        messages: data.chats,
      }));
    } catch (error) {
      console.error('Failed to load chats:', error);
      toast.error('Failed to load chat history');
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    loadChats();
  }, [isLoggedIn, navigate, loadChats]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const response = await sendChatMessage(content);
      setChatState((prev) => ({
        ...prev,
        messages: response.chats,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to get AI response');
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to get response',
      }));
    }
  };

  const handleClearChat = async () => {
    try {
      await deleteUserChats();
      setChatState((prev) => ({
        ...prev,
        messages: [],
      }));
      toast.success('Chat history cleared');
    } catch (error) {
      console.error('Failed to clear chats:', error);
      toast.error('Failed to clear chat history');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold">AI Chatbot</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              {user?.name?.[0] || 'U'}
            </div>
            <span className="text-sm font-medium">{user?.name || 'User'}</span>
          </div>
          <button
            onClick={handleClearChat}
            className="p-2 text-gray-500 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onSpeakMessage={() => speak(message.content)}
          />
        ))}
        {chatState.isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <LoadingSpinner size="sm" />
            <span>Thinking...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={chatState.isLoading} />
    </div>
  );
}

export default Chat;