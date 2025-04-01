import express from 'express'

import {getAll, getById, save, actualize, eliminate} from '../controllers/controller-company.js'

const route = express.Router()

/**
 * @swagger
 * /:
 * /company/:
 *  get:
 *      tags: [Company Controller]
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
 *                                  industry:
 *                                      type: string
 *                                      description: Sector o que tipo de industria pertenece
 *                                  numberIndustry:
 *                                      type: int
 *                                      description: numero que identifica el tipo de industria (1 = tecnologia, 2 = alimentos, 3 = automotriz, 4 = ropa)
 *                                  headquarters:
 *                                      type: string
 *                                      description: Ubicación de la sede principa
 *                                  founded:
 *                                      type: date
 *                                      description: Fecha de fundación
 *                                  employees:
 *                                      type: int
 *                                      description: número de trabajadores
 *                                  anualRevenue:
 *                                      type: int
 *                                      description: ventas anuales en dolares
 *                                  products:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Especifica los Indentificadores de los productos pertenecen a dicha compañia                 
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                             example:
 *                                -     _id: 67e9267d92874a63afb9bfe3
 *                                      id: 634778
 *                                      name: QuantumTech
 *                                      industry: Tecnologia
 *                                      numberIndustry: 1
 *                                      headquarters: Silicon Valley, CA
 *                                      founded: 2015-02-03T00:00:00.000Z
 *                                      employees: 2000
 *                                      anualRevenue: 5000000
 *                                      products: [67e9268e92874a63afb9bfe7, 
 *                                               67e9af9b4bedc9d3bd00368c]
 *                                      __v: 2
 *                                -     _id: 60d5ec9a1f2a4a3d98765434
 *                                      id: 5432345
 *                                      name: EcoMotors
 *                                      industry: Automotriz
 *                                      numberIndustry: 3
 *                                      headquarters: Detroit, MI
 *                                      founded: 2008-10-04
 *                                      employees: 8500
 *                                      anualRevenue: 12700000000
 *                                      products: [60d5ec9a1f2a4a3d98765c01, 
 *                                               60d5ec9a1f2a4a3d98765c02,
 *                                               60d5ec9a1f2a4a3d98765c03]
 *                                      __v: 1  
 *                                -     _id: 60d5ec9a1f2a4a3d98431224
 *                                      id: 9876545
 *                                      name: Colombina
 *                                      industry: Alimentos
 *                                      numberIndustry: 2
 *                                      headquarters: Bogota, Cundinamarca
 *                                      founded: 1990-06-14T00:00:00.000Z
 *                                      employees: 4000
 *                                      anualRevenue: 10000000000
 *                                      products: [60d5ec9a1f2a4a3d98765b01, 
 *                                               60d5ec9a1f2a4a3d98765c03,
 *                                               60d5ec9a1f2a4a3d98765b02]
 *                                      __v: 1               
 *                                -     _id: 60d5ec9a1f2a4a3d98765435
 *                                      id: 6543132
 *                                      name: Adidas
 *                                      industry: Ropa
 *                                      numberIndustry: 4
 *                                      headquarters: Angeles, California
 *                                      founded: 1975-03-25T00:00:00.000Z
 *                                      employees: 5000
 *                                      anualRevenue: 1000000000000
 *                                      products: []
 *                                      __v: 0     
 *          
 *          '500':
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si hubo error en el servidor
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: E11000 duplicate key error collection 
 *          '401':
 *              description: Es necesario autenticar para obtener la respuesta solicitada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            error:
 *                              type: string
 *                              description: Indica que error se presento
 *                              example: Session Expired 
 */
route.get('/',getAll)

/**
 * @swagger
 * /:
 * /company/{id}:
 *  get:
 *      tags: [Company Controller]
 *      summary: Recuperar una Compañia por ID
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
 *                                     example: 60d5ec9a1f2a4a3d98765436
 *                                  id:
 *                                      type: int
 *                                      description: Identificador de la compañia
 *                                      example: 51723
 *                                  name:
 *                                      type: string
 *                                      description: Nombre de la compañia
 *                                      example: Samsung
 *                                  industry:
 *                                      type: string
 *                                      description: Sector o que tipo de industria pertenece
 *                                      example: Tecnológia
 *                                  numberIndustry:
 *                                      type: int
 *                                      description: numero que identifica el tipo de industria (1 = tecnologia, 2 = alimentos, 3 = automotriz, 4 = ropa)
 *                                      example: 1
 *                                  headquarters:
 *                                      type: string
 *                                      description: Ubicación de la sede principa
 *                                      example: Shinjuku, Tokyo 
 *                                  founded:
 *                                      type: date
 *                                      description: Fecha de fundación
 *                                      example: 1938-03-25
 *                                  employees:
 *                                      type: int
 *                                      description: número de trabajadores
 *                                      example: 6000
 *                                  anualRevenue:
 *                                      type: int
 *                                      description: ventas anuales en dolares
 *                                      example: 4500000000
 *                                  products:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Especifica los Indentificadores de los productos pertenecen a dicha compañia
 *                                          example: 67dd83d6033496dc2d0533t5, 
 *                                                  67dd83d6033496dc2d0533t42                
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                                     example: 3
 *                                                                            
 *          
 *          '500':
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si hubo error en el servidor
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: E11000 duplicate key error collection 
 *          '401':
 *              description: Es necesario autenticar para obtener la respuesta solicitada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            error:
 *                              type: string
 *                              description: Indica que error se presento
 *                              example: Session Expired 
 *                 
 */
route.get('/:id',getById)

/**
 * @swagger
 * /:
 * /company/:
 *  post:
 *      tags: [Company Controller]
 *      summary: Guardar Compañias
 *      description: Creación de nueva compañía
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
 *                              example: 654246
 *                          name:
 *                              type: string
 *                              description: Nombre de la compañia
 *                              example: Postobon
 *                          industry:
 *                              type: string
 *                              description: Sector o que tipo de industria pertenece
 *                              example: Bebidas
 *                          numberIndustry:
 *                              type: int
 *                              description: numero que identifica el tipo de industria (1 = tecnologia, 2 = alimentos, 3 = automotriz, 4 = ropa)
 *                              example: 2
 *                          headquarters:
 *                              type: string
 *                              description: Ubicación de la sede principa
 *                              example: Medellín, Antioquia 
 *                          founded:
 *                              type: date
 *                              description: Fecha de fundación
 *                              example: 1904-10-11
 *                          employees:
 *                              type: int
 *                              description: número de trabajadores
 *                              example: 3000
 *                          anualRevenue:
 *                              type: int
 *                              description: ventas anuales en dolares
 *                              example: 3000000000
 *      responses:
 *         '201':
 *              description: Compañia Guardada. La solicitud ha tenido éxito y se ha creado un nuevo recurso como resultado de ello
 *              content:
 *                  application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica que la solicitud de los datos fue satisfactoria
 *                              example: true
 *                            data:
 *                             type: object
 *                             properties:
 *                                  id:
 *                                      type: int
 *                                      description: Identificador de la compañia
 *                                      example: 51723
 *                                  name:
 *                                      type: string
 *                                      description: Nombre de la compañia
 *                                      example: Samsung
 *                                  industry:
 *                                      type: string
 *                                      description: Sector o que tipo de industria pertenece
 *                                      example: Tecnológia
 *                                  numberIndustry:
 *                                      type: int
 *                                      description: numero que identifica el tipo de industria (1 = tecnologia, 2 = alimentos, 3 = automotriz, 4 = ropa)
 *                                      example: 1
 *                                  headquarters:
 *                                      type: string
 *                                      description: Ubicación de la sede principa
 *                                      example: Shinjuku, Tokyo 
 *                                  founded:
 *                                      type: date
 *                                      description: Fecha de fundación
 *                                      example: 1938-03-25T00:00:00.000Z
 *                                  employees:
 *                                      type: int
 *                                      description: número de trabajadores
 *                                      example: 6000
 *                                  anualRevenue:
 *                                      type: int
 *                                      description: ventas anuales en dolares
 *                                      example: 4500000000
 *                                  products:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Especifica los Indentificadores de los productos pertenecen a dicha compañia
 *                                          example: \t
 *                                  _id:
 *                                     type: string
 *                                     description: Identificador de la compañia en la BD
 *                                     example: 60d5ec9a1f2a4a3d98765436               
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                                     example: 0
 *         '500':
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si hubo error en el servidor
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: E11000 duplicate key error collection 
 *         '401':
 *              description: Es necesario autenticar para obtener la respuesta solicitada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            error:
 *                              type: string
 *                              description: Indica que error se presento
 *                              example: Session Expired                     
 *                               
 *                                               
 */
route.post('/',save)

/**
 * @swagger
 * /:
 * /company/{id}:
 *  put:
 *      tags: [Company Controller]
 *      summary: Actualizar Compañias
 *      description: Actualizar los datos de la compañía según el id que se pase
 *      parameters:
 *         -    in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Identificador de la compañia en la BD
 *      requestBody:
 *          description: Actualiza la Compañia
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object    
 *                      properties:
 *                          id:
 *                              type: int
 *                              description: Identificador de la compañia
 *                              example: 654246
 *                          name:
 *                              type: string
 *                              description: Nombre de la compañia
 *                              example: Postobon
 *                          industry:
 *                              type: string
 *                              description: Sector o que tipo de industria pertenece
 *                              example: Bebidas
 *                          numberIndustry:
 *                              type: int
 *                              description: numero que identifica el tipo de industria (1 = tecnologia, 2 = alimentos, 3 = automotriz, 4 = ropa)
 *                              example: 2
 *                          headquarters:
 *                              type: string
 *                              description: Ubicación de la sede principa
 *                              example: Medellín, Antioquia 
 *                          founded:
 *                              type: date
 *                              description: Fecha de fundación
 *                              example: 1904-10-11
 *                          employees:
 *                              type: int
 *                              description: número de trabajadores
 *                              example: 3000
 *                          anualRevenue:
 *                              type: int
 *                              description: ventas anuales en dolares
 *                              example: 3000000000
 *      responses:
 *         '201':
 *              description: Compañia Guardada. La solicitud ha tenido éxito y se ha actulizado un nuevo recurso como resultado de ello
 *              content:
 *                  application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica que la solicitud de los datos fue satisfactoria
 *                              example: true
 *                            data:
 *                             type: object
 *                             properties:
 * 
 *                                  _id:
 *                                     type: string
 *                                     description: Identificador de la compañia en la BD
 *                                     example: 60d5ec9a1f2a4a3d98765436   
 *                                  id:
 *                                      type: int
 *                                      description: Identificador de la compañia
 *                                      example: 51723
 *                                  name:
 *                                      type: string
 *                                      description: Nombre de la compañia
 *                                      example: Samsung
 *                                  industry:
 *                                      type: string
 *                                      description: Sector o que tipo de industria pertenece
 *                                      example: Tecnológia
 *                                  numberIndustry:
 *                                      type: int
 *                                      description: numero que identifica el tipo de industria (1 = tecnologia, 2 = alimentos, 3 = automotriz, 4 = ropa)
 *                                      example: 1
 *                                  headquarters:
 *                                      type: string
 *                                      description: Ubicación de la sede principa
 *                                      example: Shinjuku, Tokyo 
 *                                  founded:
 *                                      type: date
 *                                      description: Fecha de fundación
 *                                      example: 1938-03-25T00:00:00.000Z
 *                                  employees:
 *                                      type: int
 *                                      description: número de trabajadores
 *                                      example: 6000
 *                                  anualRevenue:
 *                                      type: int
 *                                      description: ventas anuales en dolares
 *                                      example: 4500000000
 *                                  products:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                          description: Especifica los Indentificadores de los productos pertenecen a dicha compañia
 *                                          example: 67e9ccd0936cb50bbbfbd2ae
 *                                              
 *                                  __v:
 *                                     type: int
 *                                     description: clave de versión que se utiliza para registrar las revisiones de un documento.
 *                                     example: 0
 *         '500':
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si hubo error en el servidor
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: E11000 duplicate key error collection 
 *         '401':
 *              description: Es necesario autenticar para obtener la respuesta solicitada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            error:
 *                              type: string
 *                              description: Indica que error se presento
 *                              example: Session Expired
 *  
 *         '404':
 *              description: El servidor no pudo encontrar el contenido solicitado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se encontro el ID o no
 *                              example: false     
 *                            message:
 *                              type: string
 *                              description: Indica que error se presento
 *                              example: ID Company Not Found          
 *                               
 *                                               
 */
route.put('/:id', actualize)

/**
 * @swagger
 * /:
 * /company/{id}:
 *  delete:
 *      tags: [Company Controller]
 *      summary: Eliminar una Compañia por ID
 *      description: Eliminar una compañia segun el id de la base de datos
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
 *                                  acknowledged:
 *                                     type: boolean
 *                                     description: Si se admitio la eliminación
 *                                     example: true
 *                                  deletedCount:
 *                                      type: int
 *                                      description: Muestra el conteo de elementos borrados
 *                                      example: 1
 *                                                                            
 *          
 *          '500':
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si hubo error en el servidor
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: E11000 duplicate key error collection 
 *          '401':
 *              description: Es necesario autenticar para obtener la respuesta solicitada
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            error:
 *                              type: string
 *                              description: Indica que error se presento
 *                              example: Session Expired
 *  
 *          '404':
 *              description: El servidor no pudo encontrar el contenido solicitado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se encontro el ID o no
 *                              example: false     
 *                            message:
 *                              type: string
 *                              description: Indica que error se presento
 *                              example: ID Company Not Found  
 *                 
 */
route.delete('/:id', eliminate)

export default route