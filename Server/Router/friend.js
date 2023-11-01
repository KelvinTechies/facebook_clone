import express from'express'
import AuthenticateUser from '../Auth/Authenticateuser.js'
import { AcceptFrndReQst, allFrndsForUser, cancelFrndRequest } from '../Controller/friends.js'


const frndRouter = express.Router()

frndRouter.post('/', AuthenticateUser, AcceptFrndReQst)
frndRouter.get('/', AuthenticateUser, allFrndsForUser)
frndRouter.delete('/cancl_frnd', AuthenticateUser, cancelFrndRequest)


export default frndRouter