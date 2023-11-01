import express from 'express'
import { deletePost, getUserPost, likePost, makePost } from '../Controller/postController.js'
import AuthenticateUser from '../Auth/Authenticateuser.js'
const postRouter = express.Router()
 
postRouter.post('/', AuthenticateUser, makePost)
postRouter.get('/', AuthenticateUser, getUserPost)
postRouter.put('/likes', AuthenticateUser, likePost)
// postRouter.get('/', AuthenticateUser, getUserPost)
postRouter.delete('/deletepost/:id', AuthenticateUser, deletePost)
export default postRouter
