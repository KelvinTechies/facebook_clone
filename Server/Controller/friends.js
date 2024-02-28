import Friends from "../Models/Friend.js";
import FriendRequests from "../Models/FriendRequest.js";
import Users from "../Models/Users.js";

const AcceptFrndReQst = async (req, res) => {
  const user = req.user;
  try {
    const sender = await FriendRequests.findOne({ sender: user._id }).populate(
      "sender",
      ["_id", "name"]
    );
    const newUser = await FriendRequests.findOne({
      receiver: sender.receiver._id,
    }).populate("receiver", ["_id", "name"]);

    // console.log(newUser);
    if (newUser) {
      const frnd = await Friends.create({ receiver: newUser });
      if (frnd) {
        const frndArr = await Users.findByIdAndUpdate(
          user._id,
          { $push: { friends: newUser._id } },
          { new: true }
        );
        console.log(frndArr);

        await FriendRequests.findByIdAndDelete(newUser);
        res.status(201).json(frnd);
      } else {
        res.status(404).json("did not Accepy friend Request");
      }
    } else {
      res.status(404).json("Blahhhhhhhhhh");
    }
  } catch (error) {
    console.log(error);
  }
};

const cancelFrndRequest = async (req, res) => {
  const user = req.user;
  try {
    const sender = await FriendRequests.findOne({ sender: user._id }).populate(
      "sender",
      ["_id", "name"]
    );
    const newUser = await FriendRequests.findOne({
      receiver: sender.receiver._id,
    }).populate("receiver", ["_id", "name"]);
    const fr = await FriendRequests.findByIdAndDelete(newUser);
    if (fr) {
      res.status(200).json("Friend REquest Canceled");
    } else {
      res.status(404).json("could not delete friend Request");
    }
  } catch (error) {
    console.log(error);
  }
};

const allFrndsForUser = async (req, res) => {
  const user = req.user;
  try {
    const corUser = await Users.findById(user._id);
    if (corUser) {
      res.status(200).json(corUser.friends);
    } else {
      res.status(400).json("not good");
    }
  } catch (error) {
    console.log(error);
  }
};

export { AcceptFrndReQst, cancelFrndRequest, allFrndsForUser };
