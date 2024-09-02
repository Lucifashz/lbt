import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
<<<<<<< HEAD
=======
import MatchRoute from "./routes/MatchRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ChallengeRoute from "./routes/ChallengeRoute.js";
import PartnerRoute from "./routes/PartnerRoute.js";
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
import "./utils/db.js";


dotenv.config();


const app = express();
<<<<<<< HEAD

=======
const port = 3000;
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e

app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

<<<<<<< HEAD
app.get("/refresh", (req, res) => {
    res.send(process.env.REFRESH_TOKEN_SECRET);
});

app.get("/access", (req, res) => {
    res.send(process.env.ACCESS_TOKEN_SECRET);
});



app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
=======

// Matches
app.use(MatchRoute);

// Users
app.use(UserRoute);

// Challenges
app.use(ChallengeRoute);

// Partner
app.use(PartnerRoute);




app.listen(port, () => console.log(`Example app listening on port ${port}!`));
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
