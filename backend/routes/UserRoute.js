import express from "express";
import User from "../models/UserModel.js";


const router = express.Router();

router.get('/users', async (req, res) => {
	try {
		const users = await User.find({}, { _id: 1, name: 1, username: 1, email: 1, partnerId: 1 })
		res.json(users);
	} catch (error) {
		res.status(404).json({message: error.message});
	}
});

router.get('/users/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/add-partner/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/delete-partner/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.post('/register', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.post('/login', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.delete('/logout', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/token', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});

export default router;
