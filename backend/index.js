import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import PaypalRoute from "./routes/PaypalRoute.js";
import ChallengeRoute from "./routes/ChallengeRoute.js";
import "./utils/db.js";

dotenv.config();

const app = express();


app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// paypal
app.use(PaypalRoute);

// challenge
app.use(PaypalRoute);

app.use("/db", (req, res) => {
  res.send(process.env.MONGO_URI);
});

app.use("/access", (req, res) => {
  res.send(ACCESS_TOKEN_SECRET);
});

// home page
app.use("/refresh", (req, res) => {
  res.send(REFRESH_TOKEN_SECRET);
});

app.use("/", (req, res) => {
  res.send("Halaman home");
});



app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

