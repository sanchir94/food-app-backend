import { Schema, models, model } from "mongoose";

const FOOD_CATEGORY_SCHEMA = new Schema(
  {
    foodName: String,
  },
  { timestamps: true }
);

export const FoodCategoryModel =
  models["food-category"] ||
  model("FoodCategory", FOOD_CATEGORY_SCHEMA, "food-category");
