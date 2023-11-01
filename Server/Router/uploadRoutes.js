import express from "express";

import multer from "multer";

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upLoad = multer({ storage: storage }).single("file");

uploadRouter.post("/", (req, res) => {
  try {
    upLoad(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json("Profile Picture Updated");
      }
    });
  } catch (error) {
    console.log(error);
  }
});
