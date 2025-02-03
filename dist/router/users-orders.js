"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrdersRouter = void 0;
const express_1 = require("express");
const users_1 = require("../models/users");
exports.UserOrdersRouter = (0, express_1.Router)();
exports.UserOrdersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_1.usersModel.find();
    res.json(users);
}));
exports.UserOrdersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_1.usersModel.create({
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
}));
exports.UserOrdersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteId = req.params.id;
    const deleteUsers = yield users_1.usersModel.findByIdAndDelete(deleteId);
    res.json({ message: "Users deleted", deleteUsers });
}));
exports.UserOrdersRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateId = req.params.id;
    const usersUpdate = yield users_1.usersModel.findByIdAndUpdate(updateId, {
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
    }, { new: true });
    res.json(usersUpdate);
}));
