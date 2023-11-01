import mongoose from "mongoose";
// import { Component } from "react";

const connectDb = (url) => {
  try {
    const connectionString = mongoose.connect(url);
    if (connectionString) {
      console.log("Connected to database successfully");
    } else {
      console.log("Something went Wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
