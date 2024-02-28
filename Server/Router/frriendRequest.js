import expresss from "express";
import {
  AddFriendRequest,
  AllFrndRequests,
  deleteFrndRequest,
} from "../Controller/friendRequest.js";
import AuthenticateUser from "../Auth/Authenticateuser.js";

const friendRequestRouter = expresss.Router();

friendRequestRouter.post("/", AuthenticateUser, AddFriendRequest);
friendRequestRouter.get("/", AuthenticateUser, AllFrndRequests);
friendRequestRouter.delete("/deleterqst", deleteFrndRequest, AddFriendRequest);

export default friendRequestRouter;
