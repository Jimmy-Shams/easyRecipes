import mongoose from "mongoose";

let supportSchema = mongoose.Schema(
  {
    supportName: {
      type: String,
      required: true,
    },
    supportRealName: {
      type: String,
      required: true,
    },
    supportEmail: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    supportPass: {
      type: String,
      required: true,
    },
    supportMobileNo: {
      type: String,
      required: true,
    },
    supportAddress: {
      type: String,
      required: true,
    },
    supportGender: {
      type: String,
      required: true,
    },
    supportBirthdate: {
      type: String,
      required: true,
    },
    supportID: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    supportActiveStatus: {
      type: Boolean,
      required: true,
    },
  },
  { timeStamps: true }
);

const support = mongoose.model("supports", supportSchema);

export default support;
