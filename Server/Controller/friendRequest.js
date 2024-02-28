import FriendRequests from "../Models/FriendRequest.js";
import Users from "../Models/Users.js";

const AddFriendRequest = async (req, res) => {
  const { id } = req.body;
  const sender = req.user;
  try {
    const user = await Users.findById(id);
    const user_id = await FriendRequests.findOne({
      receiver: user._id,
    }).populate("receiver", ["_id", "name"]);

    if (user_id) {
      res.status(203).json("Friend Request already sent");
      console.log(user_id);
    } else {
      const fRequest = await FriendRequests.create({ sender, receiver: user });
      if (fRequest) {
        res.status(201).json(fRequest);
      } else {
        res.status(400).json("Could not srend request");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteFrndRequest = async (req, res) => {
  const { id } = req.body;
  try {
    //    const user = await Users.findById(id)
    const user_id = await FriendRequests.findByIdAndDelete(id);

    if (user_id) {
      // console.log(user_id);

      res.status(200).json("Friend Request Delleted");
    } else {
      console.log("cannot delete dis friend request");
    }
  } catch (error) {
    console.log(error);
  }
};

const AllFrndRequests = async (req, res) => {
  const N_user = req.user;
  const { id } = req.body;
  // try {
  //   //    const user = await Users.findById(id)
  //   const user_id = await Users.find(N_user._id);
  //   if (user_id) {
  //     const frnd = await FriendRequests.create({ receiver: id });
  //     if (frnd) {
  //       const frndArr = await Users.findByIdAndUpdate(
  //         N_user._id,
  //         { $push: { friendRequests: id } },
  //         { new: true }
  //       );
  //       if (frndArr) {
  //         res.status(200).json({ frdRqst: frndArr.friendRequests });
  //       }
  //     }
  //   }
  // } catch (error) {
  //   console.log(error);
  // }

  try {
    const user = await Users.findById(N_user._id);
    // const user_id = await Users.find(N_user._id);
    /*  if (user) {
      const frnd = await FriendRequests.create({ receiver: id });
      if (frnd) {
      } */
    if (user) {
      res.status(200).json({ frdRqst: user.friendRequests });
    }
  } catch (error) {
    console.log(error);
  }
};

export { AddFriendRequest, deleteFrndRequest, AllFrndRequests };
