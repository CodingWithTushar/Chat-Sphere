import mongoose from "mongoose";
const model = mongoose.model;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId

const MessageSchema = new Schema({
    senderId: {type: ObjectId , ref :"User", required:true},
    receiverId: {type: ObjectId , ref :"User", required:true},
    text: {type:String},
    image: {type:String}
  }, {timestamps: true});

  const MessageModel = model("Message" , MessageSchema);


export default MessageModel