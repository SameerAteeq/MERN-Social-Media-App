import ChatModel from "../Models/chatModel.js";

//GET ALL CHATS

export const getChats = async (req, res) => {
  try {
    const allChats = await ChatModel.find();
    res.status(200).json(allChats);
  } catch (error) {
    res.status(500).json(error);
  }
};

//CREATE CHAT
export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.recieverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

// USER CHATS....
export const usersChat = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

//FIND CHAT...

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
