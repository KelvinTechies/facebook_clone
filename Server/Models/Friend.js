import mongoose from "mongoose";


const friendSchema = mongoose.Schema({
    receiver:{
        type:mongoose.Schema.Types.ObjectId, ref:'Users'
    },
}, {timestamps:true})


const Friends = mongoose.model('Friends', friendSchema)


export default Friends