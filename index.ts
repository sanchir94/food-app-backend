import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import { FoodCategoryModel } from "./models/FoodCategoryModel";
import { FoodModel } from "./models/FoodModel";
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

app.get("/food", async (req: Request, res: Response) => {
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
    foodName: req.body.foodName,
  });

  res.json({
    newItem,
  });
});

app.put("/food-category/:id", async (req: Request, res: Response) => {
  const updateItem = await FoodCategoryModel.findByIdAndUpdate(
    req.params.id,
    {
      foodName: req.body.foodName,
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
