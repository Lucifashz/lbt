import express from "express";


const router = express.Router();

router.post('/challenge', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/challenges', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/challenges-by-challenged-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.get('/challenges-by-challenger-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/challenges-by-challenged-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/challenges-by-challenger-id/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});
router.patch('/challenges-match-status/:id', (req, res) => {
   res.send(process.env.PAYPAL_CLIENT_ID);
});

export default router;
