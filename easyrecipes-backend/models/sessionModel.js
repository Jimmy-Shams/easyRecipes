import mongoose from "mongoose";

let messageSchema = mongoose.Schema({
  senderName: { type: String, required: true },
  senderID: { type: String, required: true },
  timeSent: {
    type: Date,
    required: true,
  },
});

let sessionSchema = mongoose.Schema(
  {
    sessionID: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    messages: [messageSchema],
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timeStamps: true }
);

const session = mongoose.model("session", sessionSchema);

export default session;
