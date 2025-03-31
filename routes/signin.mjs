import express from 'express'
import loggin from '../controllers/controller-signin.js'

const route = express.Router()

route.post('/', loggin);

export default route