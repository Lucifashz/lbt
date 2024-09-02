import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import "./utils/db.js";


dotenv.config();


const app = express();


app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/refresh", (req, res) => {
    res.send(process.env.REFRESH_TOKEN_SECRET);
});

app.get("/access", (req, res) => {
    res.send(process.env.ACCESS_TOKEN_SECRET);
});



app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));