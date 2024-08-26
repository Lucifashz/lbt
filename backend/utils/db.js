import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

mongoose.connect("mongodb+srv://achrangga44:CPPVbSjmLjXnHr3l@cluster0.avrqa.mongodb.net/db_badminton?retryWrites=true&w=majority&appName=Cluster0")
   .then(() => {
      console.log('Connected to the database');
   }).catch((error) => {
      console.log('Database connection error:', error);
   });
