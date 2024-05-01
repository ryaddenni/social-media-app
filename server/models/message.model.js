import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    // Unique Message Id
    Message_id: mongoose.Schema.Types.ObjectId,

    // Unique ID of the user who sent the message
    SenderId: {type: mongoose.Schema.Types.ObjectId, required: true },
    
    // id of the conversation the message belongs to 
    ChatId: {
        type: mongoose.Schema.Types.ObjectId, required: true },
        
    Content: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    },
});

// Message.model.js
const Message = mongoose.model('Message', MessageSchema);
export default Message;



