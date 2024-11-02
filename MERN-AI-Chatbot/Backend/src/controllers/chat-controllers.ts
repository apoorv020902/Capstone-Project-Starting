import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAIApi from "openai";
import ChatCompletionRequestMessage from "openai";

// Controller to generate chat completion from OpenAI
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    // Retrieve user details using the ID stored in the JWT token
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token malfunctioned" });
    }

    // Format the user's chat history to match OpenAI API's requirements
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    // Append the new user message to the chats array
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Initialize OpenAI API client
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // Request a response from the OpenAI API using the entire chat history
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // Save the response from OpenAI into the user's chat history
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();

    // Send the updated chat history back to the client
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Controller to retrieve all user chats
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate user using the token
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    // Ensure token user ID matches the requested user data
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Send the chat history back to the client
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

// Controller to delete all user chats
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate user using the token
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }

    // Ensure token user ID matches the requested user data
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    // Clear all chats in the user's chat history
    //@ts-ignore
    user.chats = [];
    await user.save();

    // Confirm deletion to the client
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

