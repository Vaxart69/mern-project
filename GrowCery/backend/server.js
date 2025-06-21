import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router.js";

const app = express();
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
router(app);

// connect to the database
await mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB");
        console.log("Using database:", mongoose.connection.name); 
        app.listen(3000, () => {
            console.log("Server started on port 3000...");
        });
    }).catch((e) => {
        console.error(e);
    })


