import axios from 'axios';
import { Message } from '../types';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api/v1';
axios.defaults.withCredentials = true;

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post('/user/login', { email, password });
    if (res.status !== 200) {
      throw new Error('Unable to login');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Login failed');
  }
};

export const signupUser = async (name: string, email: string, password: string) => {
  try {
    const res = await axios.post('/user/signup', { name, email, password });
    if (res.status !== 201) {
      throw new Error('Unable to Signup');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Signup failed');
  }
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.get('/user/auth-status');
    if (res.status !== 200) {
      throw new Error('Unable to authenticate');
    }
    return res.data;
  } catch (error) {
    throw new Error('Not authenticated');
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get('/user/logout');
    if (res.status !== 200) {
      throw new Error('Unable to logout');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Logout failed');
  }
};

export const sendChatMessage = async (message: string) => {
  try {
    const res = await axios.post('/chat/new', { message });
    if (res.status !== 200) {
      throw new Error('Unable to send chat');
    }
    return {
      chats: res.data.chats.map((chat: any) => ({
        id: chat.id || String(Date.now()),
        role: chat.role,
        content: chat.content,
        timestamp: new Date()
      }))
    };
  } catch (error: any) {
    console.error('Chat error:', error);
    throw new Error(error.response?.data || 'Failed to send message');
  }
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};


export const deleteUserChats = async () => {
  try {
    const res = await axios.delete('/chat/delete');
    if (res.status !== 200) {
      throw new Error('Unable to delete chats');
    }
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Failed to delete chats');
  }
};