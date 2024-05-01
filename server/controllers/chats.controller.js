import User from '../models/user.model.js';

// Controller function to get all conversations for a user
export const getUserConversations = async (req, res) => {
  try {
    // Extract user ID from request parameters
    const { userId } = req.params;

    // Fetch the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get conversation IDs from user's chats field
    const conversationIds = user.chats;

    // Fetch all conversations using the conversation IDs
    const conversations = await Conversation.find({ _id: { $in: conversationIds } });

    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user conversations' });
  }
};
