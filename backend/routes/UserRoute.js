import express from "express";
import { getUsers, getUserById } from "../controllers/UsersController.js";



const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);


router.patch('/add-partner/:id', async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      const partner = await User.findById(req.body["partner"]);

      // mengecek req.body
      if (typeof req.body["partner"] === 'undefined') {
         return res.status(401).send({ message: "Partner tidak ditemukan" });
      }

      // mencegah menambahkan diri sendiri sebagai partner
      if (req.params.id === req.body["partner"]) {
         return res.status(401).send({ message: "Tidak bisa menambahkan diri kamu sebagai partner" });
      }

      // mengecek kedua user apakah sudah mempunyai partner
      if (user?.partnerId || partner?.partnerId) {
         return res.status(401).send({ message: "Kamu atau keduanya sudah punya partner" });
      }

      // menambahkan partner
      await User.updateOne({ _id: req.params.id }, { $set: { partnerId: req.body["partner"] } });
      await User.updateOne({ _id: req.body["partner"] }, { $set: { partnerId: req.params.id } });

      // mengirim pesan 
      res.status(200).json({ message: "Partner berhasil ditambahkan" });

   } catch (error) {
      // menangkap pesan error
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
