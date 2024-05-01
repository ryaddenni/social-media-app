import mongoose from 'mongoose';


const userschema = new mongoose.Schema(
    {
        firstname : String,
        lastname : String,
        password : String,
        email : String,
        bio : String,
        picturePath: {
          type: String,
          default: "",
        },
        friends: {
          type: Array,
          default: [],
        },
        birthdate : Date ,
       conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }],
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }] 
    }

)
const User = mongoose.model('User', userschema);
export default User;
