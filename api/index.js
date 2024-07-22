import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("data base");
  } catch (e) {
    console.log(e);
  }
};

app.listen(8800, () => {
  console.log("connect ");
  connect();
});
