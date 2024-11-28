import OpenAI from 'openai';
import { getRandomMockResponse } from './mockResponses';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

export const generateAIResponse = async (message: string): Promise<string> => {
  try {
    if (!apiKey) {
      console.warn('OpenAI API key not found, falling back to mock responses');
      return getRandomMockResponse(message);
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error: any) {
    console.error('OpenAI API Error:', error);

    // Handle specific API errors
    if (error?.error?.type === 'insufficient_quota') {
      console.warn('OpenAI API quota exceeded, falling back to mock responses');
      return getRandomMockResponse(message);
    }

    if (error?.status === 429) {
      return getRandomMockResponse(message);
    }

    return 'I apologize, but I am currently unable to process your request. Please try again later.';
  }
};