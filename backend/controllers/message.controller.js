import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Check if the conversation already exists
    let conversation = await Conversation.findOne({
      paticipants: { $all: [senderId, receiverId] },
    });

    // Create a new conversation if it doesn't exist
    if (!conversation) {
      conversation = await Conversation.create({
        paticipants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      // Add the new message to the conversation
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    // Socket.io will go here

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error sending message", error);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;
    const senderId = req.user._id;

    // get messages between two users in a conversation
    const conversation = await Conversation.findOne({
      paticipants: { $all: [senderId, userTochatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error getting messages", error);
    res.status(500).json({ error: error.message });
  }
};
