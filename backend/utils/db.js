import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      console.log('Connected to the database');
   }).catch((error) => {
      console.log('Database connection error:', error);
<<<<<<< HEAD
   });
=======
   });
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
