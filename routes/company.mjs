import express from 'express'

import {getAll, getById, save, actualize} from '../controllers/controller-company.js'

const route = express.Router()

route.get('/',getAll)
route.get('/:id',getById)
route.post('/',save)
route.put('/:idn', actualize)

export default route