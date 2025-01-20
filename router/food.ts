import { Request, Response, Router } from "express";
import { FoodModel } from "../models/FoodModel";

export const foodRouter = Router();

foodRouter.get("/", async (req: Request, res: Response) => {
  const foodNames = await FoodModel.find();
  res.json(foodNames);
});
foodRouter.post("/", async (req: Request, res: Response) => {
  const newItem = await FoodModel.create({
    foodName: req.body.foodName,
    price: req.body.price,
    ingredients: req.body.ingredients,
  });
  res.send({
    message: "New category created",
    newItem,
  });
});

foodRouter.delete("/:id", async (req: Request, res: Response) => {
  const foodJson = await FoodModel.findByIdAndDelete(req.params.id);
  res.send("deleted lol");
  res.json(foodJson);
});

foodRouter.put("/:id", async (req: Request, res: Response) => {
  const updateId = req.params.id.trim();
  const updated = await FoodModel.findByIdAndUpdate(
    updateId,
    { foodName: req.body.foodName },
    { new: true }
  );
  res.json(updated);
});
