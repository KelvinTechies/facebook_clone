import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    friends: {
      type: Array,
    },
    friendRequests: {
      type: Array,
    },
    profileImg: {
      type: String,
    },
    coverImg: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function nxt() {
  if (!this.isModified("password")) {
    nxt();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePwd = async function (pwd) {
  return bcrypt.compare(pwd, this.password);
};

const Users = mongoose.model("Users", UserSchema);

export default Users;
