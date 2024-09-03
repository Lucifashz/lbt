import express from "express";


const router = express.Router();

router.post('/partner', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/partners', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/partners-by-receiver-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/partners-by-sender-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/partners-by-receiver-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/partners-by-sender-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/partners-partner-status/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});

export default router;
