import mongoose from "mongoose";


const friendRequestSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId, ref:'Users'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId, ref:'Users'
    }
}, {timestamps:true})


const FriendRequests = mongoose.model('FriendRequests', friendRequestSchema)


export default FriendRequests