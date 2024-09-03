import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import MatchRoute from "./routes/MatchRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ChallengeRoute from "./routes/ChallengeRoute.js";
import PartnerRoute from "./routes/PartnerRoute.js";
import "./utils/db.js";

dotenv.config();

const app = express();


app.use(cors(
  { 
    origin: true,
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
  }
));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));

app.get('/cookie', (req, res) => {
  let response;

  if (req.cookies?.somecookie) {
    response = 'Same cookie: A cookie received and the same sent to client';
  } else {
    res.cookie('somecookie', 'cookie text');
    response = 'New cookie: A new cookie created and sent to the client';
  }

  res.send(response);
});


// Matches
app.use(MatchRoute);

// Users
app.use(UserRoute);

// Challenges
app.use(ChallengeRoute);

// Partner
app.use(PartnerRoute);




app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

