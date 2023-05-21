import mongoose from "mongoose";

let adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },
    adminRealName: {
      type: String,
      required: true,
    },
    adminEmail: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    adminID: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    adminPass: {
      type: String,
      required: true,
    },
    adminMobileNo: {
      type: String,
      required: true,
    },
    adminAddress: {
      type: String,
      required: true,
    },
    adminGender: {
      type: String,
      required: true,
    },
    adminBirthdate: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const admin = mongoose.model("admin", adminSchema);

export default admin;
