import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";


export const getUsers = async (req, res) => {
	try {
		const users = await User.find({}, { _id: 1, name: 1, username: 1, email: 1, partnerId: 1 })
		res.json(users);
	} catch (error) {
		res.status(404).json({message: error.message});
	}
}
