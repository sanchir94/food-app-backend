import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

configDotenv();

const connectMongoDB = async () => {
  const URI = process.env.MONGODB_URI;
  await mongoose.connect(URI);
};

connectMongoDB();

const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
  {
    categoryName: String,
  },
  { timestamps: true }
);

const FoodCategoryModel = mongoose.model(
  "FoodCategory",
  FOOD_CATEGORY_SCHEMA,
  "food-categories"
);

app.get("/food-category/", async (req: Request, res: Response) => {
  const data = await FoodCategoryModel.find();
  res.json(data);
});

app.get("/food-category/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await FoodCategoryModel.findById(id);
  res.json(item);
});

app.post("/food-category", async (req: Request, res: Response) => {
  const newItem = await FoodCategoryModel.create({
    categoryName: req.body.categoryName,
  });

  res.json({
    message: "New Food Category created successfully.",
    data: newItem,
  });
});

app.put("/food-category/:id", async (req: Request, res: Response) => {
  const updateItem = await FoodCategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      categoryName: req.body.categoryName,
    },
    { new: true }
  );
  res.json(updateItem);
});

app.delete("/food-category/:id", async (req: Request, res: Response) => {
  const deletedItem = await FoodCategoryModel.findByIdAndDelete(req.params.id);
  res.json(deletedItem);
});

app.get("/food-category", async (req: Request, res: Response) => {
  res.json({
    message: "All Food Categories",
  });
});

app.listen(PORT, () => {
  console.log(`Server id Running on http://localhost:${PORT}`);
});
