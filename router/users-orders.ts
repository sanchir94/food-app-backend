import { Router } from "express";
import { usersModel } from "../models/users";
import { Request, Response } from "express";

export const UserOrdersRouter = Router();

UserOrdersRouter.get("/", async (req: Request, res: Response) => {
  const users = await usersModel.find();
  res.json(users);
});

UserOrdersRouter.post("/", async (req: Request, res: Response) => {
  const newUser = await usersModel.create({
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    role: req.body.role,
    orderedFoods: req.body.orderedFoods,
    ttl: Date.now(),
    isVerified: req.body.isVerified,
    ingredients: req.body.ingredients,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  console.log(newUser);
  res.json({ message: "new food created succesfully", newUser });
});

UserOrdersRouter.delete("/:id", async (req: Request, res: Response) => {
  const deleteId = req.params.id;
  const deleteUsers = await usersModel.findByIdAndDelete(deleteId);

  res.json({ message: "Users deleted", deleteUsers });
});

UserOrdersRouter.put("/:id", async (req: Request, res: Response) => {
  const updateId = req.params.id;
  const usersUpdate = await usersModel.findByIdAndUpdate(
    updateId,
    {
      email: req.body.email,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      role: req.body.role,
      orderedFoods: req.body.orderedFoods,
      ttl: Date.now(),
      isVerified: req.body.isVerified,
      ingredients: req.body.ingredients,
      price: req.body.price,
      quantity: req.body.quantity,
    },
    { new: true }
  );
  res.json(usersUpdate);
});
