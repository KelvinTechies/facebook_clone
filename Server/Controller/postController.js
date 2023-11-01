import Posts from "../Models/Posts.js";

const makePost = async (req, res) => {
  const { desc } = req.body;
  const user = req.user;
  try {
    const post = await Posts.create({
      desc,
      user,
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(403).json("You are not Authoruze to create a post");
    }
  } catch (error) {
    console.log(error);
  }
};
const getUserPost = async (req, res) => {
  const user_id = req.user._id;
  try {
    const post = await Posts.find({ user: user_id }).populate("user", [
      "_id",
      "name",
    ]);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(403).json("You are not Authorizee to view your post");
    }
    console.log(
      "-------------------------------------------------------------------------"
    );
    console.log(post);
    console.log(
      "-------------------------------------------------------------------------"
    );
  } catch (error) {
    console.log(error);
  }
};
const deletePost = async (req, res) => {
  const id = req.params;

  try {
    const post = await Posts.findByIdAndDelete(id);
    if (post) {
      res.status(200).json("Post Deleted Successfully");
    } else {
      res.status(403).json("You are not Authoruze to Deleted a post");
    }
  } catch (error) {}
};

const likePost = async(req, res) => {
  const post_id = req.body;
//   console.log(liked); 

  const uid = req.user._id
  try {
    const liked = await Posts.findByIdAndUpdate(post_id, {$push:{likes:uid}}, {new:true})
  console.log(liked); 

    if (liked) {
      res.status(200).json(`${req.user.name} liked your post`);
    } else {
      res.status(403).json(` liked  post not working`);
    }
  } catch (error) {
    console.log(error); 
  }
};

export { makePost, deletePost, getUserPost, likePost };
