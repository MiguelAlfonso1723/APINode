import express from 'express'

import {getAll, findById, save, actualize} from '../controllers/controller-company.js'

const route = express.Router()

/**
 * @swagger
 * /:
 * /company/:
 *  get:
 *      summary: Compañias
 *      description: Obtener todas las compañias
 *      responses:
 *          '200':
 *              description: Respuesta exitosa.
 *              content:
 *                  application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica que la consulta de los datos fue satisfactoria
 *                              example: true
 *                            data:
 *                             type: array
 *                             items:
 *                              type: object
 *                              properties:
 *                  
 *                                  _id:
 *                                     type: string
 *                                     description: Identificador de la compañia en la BD
 *                                  id:
 *                                      type: int
 *                                      description: Identificador de la compañia
 *                                  name:
 *                                      type: string
 *                                      description: Nombre de la compañia
 *                                  country:
 *                                      type: string
 *                                      description: Pais principal de operaciones la compañia
 *                                  products:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Especifica los Indentificadores de los productos pertenecen a dicha compañia
 *                                              
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                             example:
 *                                 - _id: 60f5b9b0c8d8c7b6d4b6d4
 *                                   id: 123456
 *                                   name: Nutresa
 *                                   country: Colombia
 *                                   products: [67dd83d6033496dc2d0533t5, 
 *                                              67dd83d6033496dc2d0533t4]
 *                                   __v: 2 
 *                                 - _id: 60f5b9b0c8d8c7b6d5t4r2
 *                                   id: 87568
 *                                   name: Bimbo
 *                                   country: Mexico
 *                                   products: [64fj82d0533496d83d6033t5]
 *                                   __v: 1   
 *                                 - _id: 60f5b6d5t4r29b0c8d8c7e
 *                                   id: 765456
 *                                   name: Jet
 *                                   country: Mexico
 *                                   products: []
 *                                   __v: 0              
 *                                     
 *          
 *          '501':
 *              description: Error en el servidor
 *              content:
 *                  text/plain:
 *                      schema:
 *                      type: string
 *                      example: A ocurrido un error en el servidor
 *                 
 */
route.get('/',getAll)
<<<<<<< Updated upstream
route.get('/:id',findById)
=======

/**
 * @swagger
 * /:
 * /company/{id}:
 *  get:
 *      summary: Recuperar Compañias
 *      description: Obtener una compañia segun el id de la base de datos
 *      parameters:
 *         -    in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Identificador de la compañia en la BD
 *      responses:
 *          '200':
 *              description: Respuesta exitosa.
 *              content:
 *                  application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica que la consulta de los datos fue satisfactoria
 *                              example: true
 *                            data:
 *                             type: object
 *                             properties:
 *                                  _id:
 *                                     type: string
 *                                     description: Identificador de la compañia en la BD
 *                                     example: 60f5b9b0c8d8c7b6d4b6d4
 *                                  id:
 *                                      type: int
 *                                      description: Identificador de la compañia
 *                                      example: 123456
 *                                  name:
 *                                      type: string
 *                                      description: Nombre de la compañia
 *                                      example: Nutresa
 *                                  country:
 *                                      type: string
 *                                      description: Pais principal de operaciones la compañia
 *                                      example: Colombia
 *                                  products:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Especifica los Indentificadores de los productos pertenecen a dicha compañia
 *                                          example: 67dd83d6033496dc2d0533t5
 *                                  __v:
 *                                      type: int
 *                                      description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                                      example: 1
 *                              
 *                                                  
 *          
 *          '501':
 *              description: Error en el servidor
 *              content:
 *                  text/plain:
 *                      schema:
 *                      type: string
 *                      example: A ocurrido un error en el servidor
 *                 
 */
route.get('/:id',getById)

/**
 * @swagger
 * /:
 * /company/:
 *  post:
 *      summary: Guardar Compañias
 *      requestBody:
 *          description: Crea Nueva Compañia
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object    
 *                      properties:
 *                          id:
 *                              type: int
 *                              description: Identificador de la compañia
 *                              example: 987654
 *                          name:
 *                              type: string
 *                              description: Nombre de la compañia
 *                              example: Postobon
 *                          country:
 *                              type: string
 *                              description: Pais principal de operaciones la compañia
 *                              example: Colombia
 *      responses:
 *         '201':
 *              description: Compañia Guardada
 *              content:
 *                  application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica que la consulta de los datos fue satisfactoria
 *                              example: true
 *                            data:
 *                             type: object
 *                             properties:
 *                                  id:
 *                                      type: int
 *                                      description: Identificador de la compañia
 *                                  name:
 *                                      type: string
 *                                      description: Nombre de la compañia
 *                                  country:
 *                                      type: string
 *                                      description: Pais principal de operaciones la compañia
 *                                  products:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Especifica los Indentificadores de los productos pertenecen a dicha compañia
 *                                  _id:
 *                                     type: string
 *                                     description: Identificador de la compañia en la BD
 *             
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                             example:
 *                                  id: 987654
 *                                  name: Postobon
 *                                  country: Colombia
 *                                  products: []
 *                                  _id: 60f5b9b0c8d8c7b6d4b6d4
 *                                  __v: 0 
 *                              
 *                               
 *                                               
 */
>>>>>>> Stashed changes
route.post('/',save)
route.put('/:idn', actualize)

export default route