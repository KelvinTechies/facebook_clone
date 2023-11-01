import mongoose from 'mongoose'


const PostModel = mongoose.Schema({
    user:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Users', 
        required: true,
    },
    desc:{
        type:String,
        required: true,
    },
    likes:{
        type:Array
    },
    Image:{
        type:String,
        // required: true,   
    }
}, {timestamps:true})


const Posts = mongoose.model('Posts', PostModel)


export default Posts