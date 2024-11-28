import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageSquare } from 'lucide-react';
import TypingAnim from '../components/typer/TypingAnim';
import Footer from '../components/footer/Footer';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <TypingAnim />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MessageSquare className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Natural Conversations</h2>
              <p className="text-gray-600">
                Engage in natural, flowing conversations with our AI assistant.
                Get intelligent responses and helpful information instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Bot className="w-12 h-12 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Advanced AI</h2>
              <p className="text-gray-600">
                Powered by cutting-edge AI technology to provide accurate,
                relevant, and helpful responses to your queries.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate(isLoggedIn ? '/chat' : '/login')}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              {isLoggedIn ? 'Start Chatting' : 'Get Started'}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;