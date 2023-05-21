import mongoose from "mongoose";

let productSchema = mongoose.Schema({
  ingredientID: {
    type: String,
    required: true,
    index: true,
    unique: true,
    sparse: true,
  },
  ingredientName: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: Number, required: true },
});

let commentSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    userPic: {
      type: String,
      required: true,
    },
    commentID: {
      type: String,
      required: true,
      index: true,
      unique: true,
      sparse: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    commentLikes: {
      type: Number,
      required: true,
    },
  },
  { timeStamps: true }
);

let tag = mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
});

let attributeInfo = mongoose.Schema({
  attributeName: { type: String, required: true },
  attributeValue: { type: String, required: true },
});

let recipeSchema = mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: true,
    },
    recipeID: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    recipeThumbnail: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
      required: true,
    },
    recipeDetails: {
      type: String,
      required: true,
    },
    recipeViews: {
      type: Number,
      required: true,
    },
    recipeLikes: {
      type: Number,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    attributeInfo: [attributeInfo],
    comments: [commentSchema],
    ingredients: [productSchema],
    recipeTags: [tag],
  },
  { timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" } }
);

const recipe = mongoose.model("recipes", recipeSchema);

export default recipe;
