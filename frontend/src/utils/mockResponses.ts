const mockResponses = [
  "I understand your question. Based on what you're asking, I would suggest considering multiple perspectives before making a decision.",
  "That's an interesting point you raise. Let me share some thoughts on this topic.",
  "I appreciate you bringing this up. Here's what I think about your question.",
  "Thank you for your question. Let me provide some insights that might help.",
  "I see what you're asking. Let me offer a balanced perspective on this.",
];

const contextualResponses: Record<string, string[]> = {
  greeting: [
    "Hello! How can I assist you today?",
    "Hi there! I'm here to help.",
    "Greetings! What can I do for you?",
  ],
  farewell: [
    "Goodbye! Have a great day!",
    "Take care! Feel free to return if you have more questions.",
    "Until next time! Stay well!",
  ],
  thanks: [
    "You're welcome! Is there anything else you'd like to know?",
    "Happy to help! Let me know if you need anything else.",
    "My pleasure! Don't hesitate to ask more questions.",
  ],
};

const isGreeting = (message: string): boolean => {
  const greetings = ['hi', 'hello', 'hey', 'greetings'];
  return greetings.some(greeting => 
    message.toLowerCase().includes(greeting)
  );
};

const isFarewell = (message: string): boolean => {
  const farewells = ['bye', 'goodbye', 'see you', 'farewell'];
  return farewells.some(farewell => 
    message.toLowerCase().includes(farewell)
  );
};

const isThanks = (message: string): boolean => {
  const thanks = ['thank', 'thanks', 'appreciate'];
  return thanks.some(thank => 
    message.toLowerCase().includes(thank)
  );
};

export const getRandomMockResponse = (message: string): string => {
  let responseArray = mockResponses;

  if (isGreeting(message)) {
    responseArray = contextualResponses.greeting;
  } else if (isFarewell(message)) {
    responseArray = contextualResponses.farewell;
  } else if (isThanks(message)) {
    responseArray = contextualResponses.thanks;
  }

  const randomIndex = Math.floor(Math.random() * responseArray.length);
  return responseArray[randomIndex];
};