import { Schema, models, model } from "mongoose";

const FOOD_SCHEMA = new Schema(
  {
    foodName: String,
    price: Number,
    imege: String,
    ingredients: String,
    category: Object,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

export const FoodModel = models["Food"] || model("Food", FOOD_SCHEMA, "food");
