import express from 'express'
import { LogOutUser, Login, Register, deleteUser, getUser, updateUser } from '../Controller/userController.js'
import AuthenticateUser from '../Auth/Authenticateuser.js'


const userRouter = express.Router()


userRouter.post('/user/register', Register)
userRouter.post('/user/login',  Login)
userRouter.get('/user/', AuthenticateUser, getUser)
userRouter.put('/user/', AuthenticateUser, updateUser)
userRouter.delete('/user/', AuthenticateUser, deleteUser)
userRouter.post('/user/logout', AuthenticateUser, LogOutUser)
export default userRouter