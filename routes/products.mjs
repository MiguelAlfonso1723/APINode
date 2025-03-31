import express from 'express'
import {
    getAll,
    save,
    getById,
    eliminate,
    actualize
} from '../controllers/controller-product.js'

const routes = express.Router()


/**
 * @swagger
 * /:
 * /product/:
 *  get:
 *      summary: Productos
 *      description: Obtener todas los productos
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
 *                                     description: Identificador del producto en la BD
 *                                  id:
 *                                      type: int
 *                                      description: Identificador del producto
 *                                  name:
 *                                      type: string
 *                                      description: Nombre del producto
 *                                  price:
 *                                      type: int
 *                                      description: Precio del producto
 *                                  company:
 *                                      type: string
 *                                      description: Identificador de la compañia en la BD     
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                             example:
 *                                 - _id: 60f5b9f9f8db4f32fdsds4
 *                                   id: 4565432
 *                                   name: Chocolate blanco
 *                                   price: Colombia
 *                                   company: 67dd7fad6a0ec8878sd36af
 *                                   __v: 0 
 *                                 - _id: 60f5b9x6c5vxc6v5xysds4
 *                                   id: 097656
 *                                   name: Chocoramo
 *                                   price: Colombia
 *                                   company: 67dd7fad6a0ec346sdvx6af
 *                                   __v: 0 
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
 */
routes.get('/', getAll)

routes.get('/:id', getById)

/**
 * @swagger
 * /:
 * /product/{id}:
 *  post:
 *      summary: Guardar Producto
 *      description: Guardar un producto de una compañia
 *      parameters:
 *         -    in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Identificador de la compañia en la BD a la cual se le va a agregar el producto
 *      requestBody:
 *          description: Crea un nuevo producto
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object    
 *                      properties:
 *                          id:
 *                              type: int
 *                              description: Identificador del producto
 *                              example: 543457
 *                          name:
 *                              type: string
 *                              description: Nombre del producto
 *                              example: Cocosete
 *                          price:
 *                              type: int
 *                              description: (Opcional 3000 por defecto) Precio del producto
 *                              example: 1400
 *      responses:
 *         '201':
 *              description: Producto creado y guardado
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
 *                                      description: Identificador del producto
 *                                      example: 627743    
 *                                  name:
 *                                      type: string
 *                                      description: Nombre del producto
 *                                      example: Bombonbun
 *                                  price:
 *                                      type: int
 *                                      description: Precio del producto en Pesos Colombianos
 *                                      example: 500
 *                                  _id:
 *                                      type: string
 *                                      description: Identificador del producto en la BD
 *                                      example: 60f5b9f9f8db4f32fdsds4
 *                                  company:
 *                                      type: string
 *                                      description: Identificador de la compañia en la BD
 *                                      example: 67dd7fad6a0ec8878sd36af
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                                     example: 0
 *                              
 *                               
 *                                               
 */
routes.post('/:id', save)

routes.put('/:id', actualize)

routes.delete('/:id', eliminate)

export default routes