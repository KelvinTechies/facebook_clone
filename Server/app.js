import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDb from "./Database/database.js";
import userRouter from "./Router/UserRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRouter from "./Router/postRouter.js";
import friendRequestRouter from "./Router/frriendRequest.js";
import frndRouter from "./Router/friend.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("*", cors({ origin: true, credentials: true }));

app.use("/auth", userRouter);
app.use("/post", postRouter);
app.use("/friend_request", friendRequestRouter);
app.use("/friend", frndRouter);

const PORT = process.env.PORT || 1111;
const start = () => {
  try {
    connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(
        `App Has Started on port https://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {}
};
start();
