import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";


export const getUsers = async (req, res) => {
	await User.find({}, { _id: 1, name: 1, username: 1, email: 1, partnerId: 1 })
	.then((result) => {
		res.json(result)
	})
	.catch((error) => {
		res.status(500).json({message: error.message});
	});
}
