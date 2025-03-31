import express from 'express'
import register from '../controllers/controller-signup.js'

const route = express.Router()

route.post('/', register);

export default route