import mongoose from "mongoose";

let productSchema = mongoose.Schema({
  ingredientID: { type: String },
  quantity: { type: Number },
  price: { type: Number },
});

let cartSchema = mongoose.Schema({
  cartProducts: [productSchema],
  cartID: {
    type: String,
  },
  cartPrice: {
    type: Number,
  },
});

let userOrderSchema = mongoose.Schema({
  orderID: {
    type: String,
  },
  orderDate: { type: Date },
  orderDetails: cartSchema,
});

let userTransactionSchema = mongoose.Schema({
  transactionID: {
    type: String,
    required: true,
  },
  history: [userOrderSchema],
});

let userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userRealName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    userID: {
      type: String,
      required: true,
    },
    userPass: {
      type: String,
      required: true,
    },
    userMobileNo: {
      type: String,
      required: true,
    },
    userAddress: {
      type: String,
      required: true,
    },
    userGender: {
      type: String,
      required: true,
    },
    userBirthdate: {
      type: String,
      required: true,
    },
    userCreditInfo: {
      type: String,
      required: true,
    },
    userProfilePic: {
      type: String,
      required: true,
    },
    userCart: cartSchema,

    userClickedTags: [],
  },
  { timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" } }
);

const user = mongoose.model("users", userSchema);

export default user;
