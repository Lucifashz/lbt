import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ChallengeRoute from "./routes/ChallengeRoute.js";
import UserRoute from "./routes/UserRoute.js";
import "./utils/db.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());



// challenge
app.use(ChallengeRoute);

// user
app.use(UserRoute);




app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

