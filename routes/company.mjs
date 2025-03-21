import express from 'express'

import {getAll, findById, save, actualize} from '../controllers/controller-company.js'

const route = express.Router()

route.get('/',getAll)
route.get('/:id',findById)
route.post('/',save)
route.put('/:idn', actualize)

export default route