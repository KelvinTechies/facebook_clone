import jwt from "jsonwebtoken";

const generateToken = (res, UserId) => {
  try {
    const token = jwt.sign({ UserId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT !== "development",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;
