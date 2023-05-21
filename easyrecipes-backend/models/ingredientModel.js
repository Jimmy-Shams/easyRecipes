import mongoose from "mongoose";

let ingredientSchema = mongoose.Schema(
  {
    ingredientName: {
      type: String,
      required: true,
    },
    ingredientImage: {
      type: String,
      required: true,
    },
    ingredientPrice: {
      type: Number,
      required: true,
    },
    ingredientStockQuantity: {
      type: Number,
      required: true,
    },
    ingredientID: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    ingredientDetails: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true }
);

const ingredient = mongoose.model("ingredients", ingredientSchema);

export default ingredient;
