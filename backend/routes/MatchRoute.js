import express from "express";


const router = express.Router();

router.post('/matches', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/matches/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/matches', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/matches/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});


export default router;
