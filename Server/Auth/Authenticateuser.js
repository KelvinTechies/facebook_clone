import jwt from "jsonwebtoken";
import Users from "../Models/Users.js";

const AuthenticateUser = async (req, res, nxt) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await Users.findById(decode.UserId).select("-password");
      nxt();
    } catch (error) {
      res.status(401).json({ msg: "You are not permitted for this page" });
      console.log(error);
    }
  } else {
    res.status(401).json({ msg: "You are not allowed for this route" });
  }
};

export default AuthenticateUser;
