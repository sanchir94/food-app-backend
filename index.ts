import { configDotenv } from "dotenv";
import express from "express";
import { foodCategoryRouter } from "./router/food-category";
import { foodRouter } from "./router/food";

const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

configDotenv();
let cluster: any = null;
const connectMongoDb = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Succesfully connected");
  } catch (error) {
    console.log("failed", error);
  }
};

connectMongoDb();

app.use("/food-category/", foodCategoryRouter);
app.use("/food/", foodRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
