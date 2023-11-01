import FriendRequests from "../Models/FriendRequest.js";
import Users from "../Models/Users.js";

const AddFriendRequest = async(req, res)=>{
    const {id} = req.body
    const sender = req.user
    try {
       const user = await Users.findById(id)
       const user_id = await FriendRequests.findOne({receiver:user._id}).populate('receiver', ['_id', 'name'])
 
       if (user_id) {
        res.status(203).json('Friend Request already sent')
        console.log(user_id);
        
       } else {
        const fRequest  = await FriendRequests.create({sender, receiver:user})
        if (fRequest) {
            res.status(201).json(fRequest)
        } else {
            res.status(400).json('Could not srend request')
            
        }
    }
    } catch (error) {
        console.log(error);
    }
}



const deleteFrndRequest  = async (req, res)=>{
    const {id} = req.body
    try {
    //    const user = await Users.findById(id)
       const user_id = await FriendRequests.findByIdAndDelete(id)
 
       if (user_id) {
        // console.log(user_id);

        res.status(200).json('Friend Request Delleted')
         
       }else{
        console.log('cannot delete dis friend request');

       }
    } catch (error) {
        console.log(error);
    }
}
export {AddFriendRequest, deleteFrndRequest}