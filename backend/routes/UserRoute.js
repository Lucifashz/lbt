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

router.get('/users/:id', async (req, res) => {
   	try {
		const user = await User.findById(req.params.id, {_id: 1, name: 1, username: 1, email: 1, partnerId: 1});
		res.json(user);
	} catch (error) {
		res.status(404).json({message: error.message});
	}
});


router.patch('/add-partner/:id', async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      const partner = await User.findById(req.body["partner"]);

      // Check if partner is provided in the request
      if (typeof req.body["partner"] === 'undefined') {
         return res.status(401).send({ message: "Partner tidak ditemukan" });
      }

      // Prevent user from adding themselves as a partner
      if (req.params.id === req.body["partner"]) {
         return res.status(401).send({ message: "Tidak bisa menambahkan diri kamu sebagai partner" });
      }

      // Check if both users do not already have a partner
      if (user?.partnerId || partner?.partnerId) {
         return res.status(401).send({ message: "Kamu atau keduanya sudah punya partner" });
      }

      // Update both users with each other's partnerId
      await User.updateOne({ _id: req.params.id }, { $set: { partnerId: req.body["partner"] } });
      await User.updateOne({ _id: req.body["partner"] }, { $set: { partnerId: req.params.id } });

      // Send a success response after both updates
      res.status(200).json({ message: "Partner berhasil ditambahkan" });

   } catch (error) {
      // Catch and handle any errors
      res.status(500).send({ message: error.message });
   }
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
