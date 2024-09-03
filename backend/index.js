import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ChallengeRoute from "./routes/ChallengeRoute.js";
import UserRoute from "./routes/UserRoute.js";
import "./utils/db.js";
import mongoose from "mongoose";


mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      console.log('Connected to the database');
   }).catch((error) => {
      console.log('Database connection error:', error);
   });

dotenv.config();

const app = express();


app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// challenge
app.use(ChallengeRoute);

// user
app.use(UserRoute);



app.use("/", (req, res) => {
  res.send("Halaman home");
});



app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

