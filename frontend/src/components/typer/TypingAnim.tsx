import React from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const TypingAnim = () => {
  const [text] = useTypewriter({
    words: ['Professional', 'Reliable', 'Intelligent', 'Helpful'],
    loop: true,
    typeSpeed: 100,
    deleteSpeed: 50
  });

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">
        AI Assistant that is{' '}
        <span className="text-blue-500">
          {text}
          <Cursor cursorStyle="|" />
        </span>
      </h1>
      <p className="text-xl text-gray-600">
        Your intelligent companion for conversations and assistance
      </p>
    </div>
  );
};

export default TypingAnim;