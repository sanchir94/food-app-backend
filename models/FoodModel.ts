import { Schema, models, model } from "mongoose";
import { foodCategoryRouter } from "../router/food-category";

const FOOD_SCHEMA = new Schema(
  {
    foodName: String,
    price: Number,
    image: String,
    ingredients: String,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export const FoodModel = models["Food"] || model("Food", FOOD_SCHEMA, "food");
