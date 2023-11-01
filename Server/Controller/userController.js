import Users from "../Models/Users.js";
import generateToken from "../Utils/generateToken.js";

const Register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  let user;
  try {
    if (!name || !email || !password) {
      res.status(403).json("All Fields are required");
    }
    if (password !== cpassword) {
      res.status(403).json("Password MixMatch");
    }
    user = await Users.findOne({ email });
    if (user) {
      res.status(403).json("User Already Exists");
    } else {
      user = await Users.create({ ...req.body });
      if (user) {
        res.status(200).json(user);
      } else {
        console.log("Unable to create User");
      }
    }
  } catch (error) {
    res.status(500).json("User Already Exists");
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  let user;

  try {
    if (!email || !password) {
      res.status(403).json("All Fields are required");
    } else {
      user = await Users.findOne({ email });
      if (user) {
        const pwduser = await user.comparePwd(password);
        if (pwduser) {
          const token = generateToken(res, user._id);
          res.status(201).json({ user: user, token: token });
        } else {
          res.status(401).json("Wrong Password or Email");
        }
      } else {
        res.status(500).json("User does not Exists");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const user_id = req.user._id;
  try {
    const user = await Users.findById(user_id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json("UserId does not Exists");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const user_id = req.user._id;
  const { name, email } = req.body;
  try {
    const user = await Users.findByIdAndUpdate(user_id, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json("Could not update the user");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.user._id;
  try {
    const user = await Users.findByIdAndDelete(user_id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json("Could not Delete the user");
    }
  } catch (error) {
    console.log(error);
  }
};

const LogOutUser = async (req, res) => {
  res.cookie("jwt", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " User Logged out" });
};

export { Register, Login, getUser, updateUser, deleteUser, LogOutUser };
