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
 * components:
 *   schemas:
 *     BaseProduct:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: Identificador único de MongoDB
 *           example: 60f5b9f9f8db4f32fdsds4
 *         id:
 *           type: integer
 *           description: ID numérico del producto
 *           example: 4565432
 *         name:
 *           type: string
 *           description: Nombre del producto
 *           example: Q-Phone Pro
 *         description:
 *           type: string
 *           description: Descripción del producto
 *           example: Smartphone de última generación
 *         category:
 *           type: string
 *           description: Categoría principal del producto
 *           example: Electrónica
 *         price:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *           example: 1299.99
 *         stock:
 *           type: integer
 *           description: Cantidad disponible en inventario
 *           example: 1500
 *         company:
 *           type: string
 *           description: Referencia a la compañía dueña del producto
 *           example: 60d5ec9a1f2a4a3d98765432
 *         __v:
 *           type: integer
 *           description: Versión del documento
 *           example: 0
 *     
 *     ElectronicsProduct:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseProduct'
 *         - type: object
 *           properties:
 *             features:
 *               type: array
 *               items:
 *                 type: string
 *               example: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *             warrantyYears:
 *               type: integer
 *               description: Años de garantía
 *               example: 2
 *     
 *     FoodProduct:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseProduct'
 *         - type: object
 *           properties:
 *             ingredients:
 *               type: array
 *               items:
 *                 type: string
 *               example: [Proteína de guisante, Dátiles, Almendras]
 *             weightOrVolume:
 *               type: string
 *               example: 250g
 *             flavors:
 *               type: array
 *               items:
 *                 type: string
 *               example: [Original, Chocolate]
 *             expirationDays:
 *               type: integer
 *               example: 90
 *     
 *     AutomotiveProduct:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseProduct'
 *         - type: object
 *           properties:
 *             specs:
 *               type: object
 *               additionalProperties:
 *                 type: string
 *               example:
 *                 range: 450km
 *                 acceleration: 4.2s 0-100km/h
 *                 battery: 85kWh
 *             warrantyYears:
 *               type: integer
 *               example: 3
 *             modelYear:
 *               type: integer
 *               example: 2024
 *     
 *     ClothingProduct:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseProduct'
 *         - type: object
 *           properties:
 *             sizesAvaiable:
 *               type: array
 *               items:
 *                 type: string
 *               example: [S, M, L, XL]
 *             colors:
 *               type: array
 *               items:
 *                 type: string
 *               example: [Negro, Azul, Blanco]
 *             material:
 *               type: string
 *               example: Algodón orgánico
 */


/**
 * @swagger
 * /product/:
 *   get:
 *     tags: [Product Controller]
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos, incluyendo sus variantes específicas
 *     responses:
 *       '200':
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 state:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     oneOf:
 *                       - $ref: '#/components/schemas/ElectronicsProduct'
 *                       - $ref: '#/components/schemas/FoodProduct'
 *                       - $ref: '#/components/schemas/AutomotiveProduct'
 *                       - $ref: '#/components/schemas/ClothingProduct'
 *             examples:
 *               electronics:
 *                 value:
 *                   state: true
 *                   data:
 *                     - _id: 60f5b9f9f8db4f32fdsds4
 *                       id: 1001
 *                       name: Q-Phone Pro
 *                       description: Smartphone con procesador cuántico
 *                       category: Electrónica
 *                       price: 1299.99
 *                       stock: 4500
 *                       __t: Electronics
 *                       features: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *                       warrantyYears: 2
 *                       company: 60d5ec9a1f2a4a3d98765432
 *                       __v: 0
 *               food:
 *                 value:
 *                   state: true
 *                   data:
 *                     - _id: 60f5b9f9f8db4f32fdsds5
 *                       id: 2001
 *                       name: Barrita Energética
 *                       description: Barrita con 20g de proteína vegana
 *                       category: Snacks
 *                       price: 2.99
 *                       stock: 25000
 *                       __t: Food
 *                       ingredients: [Proteína de guisante, Dátiles, Almendras]
 *                       weightOrVolume: 50g
 *                       flavors: [Original, Chocolate]
 *                       expirationDays: 90
 *                       company: 60d5ec9a1f2a4a3d98765433
 *                       __v: 0
 *               automotive:
 *                  value:
 *                   state: true
 *                   data:  
 *                     - _id: 60f5b9f9f8db4f32fdsds6
 *                       id: 3001
 *                       name: Eco-Sedan 2024
 *                       description: Vehículo eléctrico de alto rendimiento
 *                       category: Automóvil
 *                       price: 45900.00
 *                       stock: 350
 *                       __t: Automotive
 *                       specs:
 *                         range: 450km
 *                         acceleration: 4.2s 0-100km/h
 *                         battery: "85kWh"
 *                       warrantyYears: 3
 *                       modelYear: 2024  
 *                       company: 60d5ec9a1f2a4a3d98765434
 *                       __v: 0   
 *               clothing:
 *                  value:
 *                   state: true
 *                   data:    
 *                     - _id: 60f5b9f9f8db4f32fdsds7
 *                       id: 4001
 *                       name: Adidas sport-Tshirt
 *                       description: Camiseta Deportiva
 *                       category: Prenda de Vestir
 *                       price: 45900.00
 *                       stock: 350
 *                       __t: Clothing
 *                       sizesAvaiable: [S, M, L, XL]
 *                       colors: [Negro, Naranja, Azul]
 *                       material: Algodón Sintetico
 *                       company: 60d5ec9a1f2a4a3d98765435
 *                       __v: 0                 
 *               mixed:
 *                 value:
 *                   state: true
 *                   data:
 *                     - _id: 60f5b9f9f8db4f32fdsds4
 *                       id: 1001
 *                       name: Q-Phone Pro
 *                       description: Smartphone con procesador cuántico
 *                       category: Electrónica
 *                       price: 1299.99
 *                       stock: 4500
 *                       __t: Electronics
 *                       features: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *                       warrantyYears: 2
 *                       company: 60d5ec9a1f2a4a3d98765432
 *                       __v: 0
 *                     - _id: 60f5b9f9f8db4f32fdsds5
 *                       id: 2001
 *                       name: Barrita Energética
 *                       description: Barrita con 20g de proteína vegana
 *                       category: Snacks
 *                       price: 2.99
 *                       stock: 25000
 *                       __t: Food
 *                       ingredients: [Proteína de guisante, Dátiles, Almendras]
 *                       weightOrVolume: 50g
 *                       flavors: [Original, Chocolate]
 *                       expirationDays: 90
 *                       company: 60d5ec9a1f2a4a3d98765433
 *                       __v: 0
 *                     - _id: 60f5b9f9f8db4f32fdsds6
 *                       id: 3001
 *                       name: Eco-Sedan 2024
 *                       description: Vehículo eléctrico de alto rendimiento
 *                       category: Automóvil
 *                       price: 45900.00
 *                       stock: 350
 *                       __t: Automotive
 *                       specs:
 *                         range: 450km
 *                         acceleration: 4.2s 0-100km/h
 *                         battery: 85kWh
 *                       warrantyYears: 3
 *                       modelYear: 2024  
 *                       company: 60d5ec9a1f2a4a3d98765434
 *                       __v: 0
 *                     - _id: 60f5b9f9f8db4f32fdsds7
 *                       id: 4001
 *                       name: Adidas sport-Tshirt
 *                       description: Camiseta Deportiva
 *                       category: Prenda de Vestir
 *                       price: 45900.00
 *                       stock: 350
 *                       __t: Clothing
 *                       sizesAvaiable: [S, M, L, XL]
 *                       colors: [Negro, Naranja, Azul]
 *                       material: Algodón Sintetico
 *                       company: 60d5ec9a1f2a4a3d98765435
 *                       __v: 0 
 *       '500':
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
 *       '401':
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
routes.get('/', getAll)

/**
 * @swagger
 * /:
 * /product/{id}:
 *  get:
 *      tags: [Product Controller]
 *      summary: Recuperar un producto por ID
 *      description: Obtener un producto segun el id de la base de datos
 *      parameters:
 *         -    in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Identificador del producto en la BD
 *      responses:
 *          '200':
 *              description: Respuesta exitosa
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              state:
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  type: array
 *                                  oneOf:
 *                                      - $ref: '#/components/schemas/ElectronicsProduct'
 *                                      - $ref: '#/components/schemas/FoodProduct'
 *                                      - $ref: '#/components/schemas/AutomotiveProduct'
 *                                      - $ref: '#/components/schemas/ClothingProduct'
 *                                  
 *                      examples:
 *                          electronics:
 *                              value:
 *                                  state: true
 *                                  data:
 *                                     -  _id: 60f5b9f9f8db4f32fdsds4
 *                                        id: 1001
 *                                        name: Q-Phone Pro
 *                                        description: Smartphone con procesador cuántico
 *                                        category: Electrónica
 *                                        price: 1299.99
 *                                        stock: 4500
 *                                        __t: Electronics
 *                                        features: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *                                        warrantyYears: 2
 *                                        company: 60d5ec9a1f2a4a3d98765432
 *                                        __v: 0
 *                          food:
 *                              value:
 *                                  state: true
 *                                  data:
 *                                     -  _id: 60f5b9f9f8db4f32fdsds5
 *                                        id: 2001
 *                                        name: Barrita Energética
 *                                        description: Barrita con 20g de proteína vegana
 *                                        category: Snacks
 *                                        price: 2.99
 *                                        stock: 25000
 *                                        __t: Food
 *                                        ingredients: [Proteína de guisante, Dátiles, Almendras]
 *                                        weightOrVolume: 50g
 *                                        flavors: [Original, Chocolate]
 *                                        expirationDays: 90
 *                                        company: 60d5ec9a1f2a4a3d98765433
 *                                        __v: 0
 *                          automotive:
 *                              value:
 *                                  state: true
 *                                  data:  
 *                                      - _id: 60f5b9f9f8db4f32fdsds6
 *                                        id: 3001
 *                                        name: Eco-Sedan 2024
 *                                        description: Vehículo eléctrico de alto rendimiento
 *                                        category: Automóvil
 *                                        price: 45900.00
 *                                        stock: 350
 *                                        __t: Automotive
 *                                        specs:
 *                                          range: 450km
 *                                          acceleration: 4.2s 0-100km/h
 *                                          battery: "85kWh"
 *                                        warrantyYears: 3
 *                                        modelYear: 2024  
 *                                        company: 60d5ec9a1f2a4a3d98765434
 *                                        __v: 0   
 *                          clothing:
 *                              value:
 *                                  state: true
 *                                  data:    
 *                                      - _id: 60f5b9f9f8db4f32fdsds7
 *                                        id: 4001
 *                                        name: Adidas sport-Tshirt
 *                                        description: Camiseta Deportiva
 *                                        category: Prenda de Vestir
 *                                        price: 45900.00
 *                                        stock: 350
 *                                        __t: Clothing
 *                                        sizesAvaiable: [S, M, L, XL]
 *                                        colors: [Negro, Naranja, Azul]
 *                                        material: Algodón Sintetico
 *                                        company: 60d5ec9a1f2a4a3d98765435
 *                                        __v: 0       
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
routes.get('/:id', getById)

/**
 * @swagger
 * /:
 * /product/{id}:
 *  post:
 *      tags: [Product Controller]
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
 *                      oneOf:
 *                          - $ref: '#/components/schemas/ElectronicsProduct'
 *                          - $ref: '#/components/schemas/FoodProduct'
 *                          - $ref: '#/components/schemas/AutomotiveProduct'
 *                          - $ref: '#/components/schemas/ClothingProduct'
 *                  examples:
 *                          electronics:
 *                              value:
 *                                  id: 1001
 *                                  name: Q-Phone Pro
 *                                  description: Smartphone con procesador cuántico
 *                                  category: Electrónica
 *                                  price: 1299.99
 *                                  stock: 4500
 *                                  features: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *                                  warrantyYears: 2
 *                                        
 *                          food:
 *                              value:
 *                                  id: 2001
 *                                  name: Barrita Energética
 *                                  description: Barrita con 20g de proteína vegana
 *                                  category: Snacks
 *                                  price: 2.99
 *                                  stock: 25000
 *                                  ingredients: [Proteína de guisante, Dátiles, Almendras]
 *                                  weightOrVolume: 50g
 *                                  flavors: [Original, Chocolate]
 *                                  expirationDays: 90
 *                                        
 *                          automotive:
 *                              value:
 *                                  id: 3001
 *                                  name: Eco-Sedan 2024
 *                                  description: Vehículo eléctrico de alto rendimiento
 *                                  category: Automóvil
 *                                  price: 45900.00
 *                                  stock: 350
 *                                  specs:
 *                                  range: 450km
 *                                  acceleration: 4.2s 0-100km/h
 *                                  battery: "85kWh"
 *                                  warrantyYears: 3
 *                                  modelYear: 2024  
 *                                          
 *                          clothing:
 *                              value:
 *                                  id: 4001
 *                                  name: Adidas sport-Tshirt
 *                                  description: Camiseta Deportiva
 *                                  category: Prenda de Vestir
 *                                  price: 45900.00
 *                                  stock: 350
 *                                  sizesAvaiable: [S, M, L, XL]
 *                                  colors: [Negro, Naranja, Azul]
 *                                  material: Algodón Sintetico   
 *      responses:
 *         '201':
 *              description: Producto creado y guardado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              state:
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  type: array
 *                                  oneOf:
 *                                      - $ref: '#/components/schemas/ElectronicsProduct'
 *                                      - $ref: '#/components/schemas/FoodProduct'
 *                                      - $ref: '#/components/schemas/AutomotiveProduct'
 *                                      - $ref: '#/components/schemas/ClothingProduct'
 *                                  
 *                      examples:
 *                          electronics:
 *                              value:
 *                                  state: true
 *                                  data:
 *                                     -  _id: 60f5b9f9f8db4f32fdsds4
 *                                        id: 1001
 *                                        name: Q-Phone Pro
 *                                        description: Smartphone con procesador cuántico
 *                                        category: Electrónica
 *                                        price: 1299.99
 *                                        stock: 4500
 *                                        __t: Electronics
 *                                        features: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *                                        warrantyYears: 2
 *                                        company: 60d5ec9a1f2a4a3d98765432
 *                                        __v: 0
 *                          food:
 *                              value:
 *                                  state: true
 *                                  data:
 *                                     -  _id: 60f5b9f9f8db4f32fdsds5
 *                                        id: 2001
 *                                        name: Barrita Energética
 *                                        description: Barrita con 20g de proteína vegana
 *                                        category: Snacks
 *                                        price: 2.99
 *                                        stock: 25000
 *                                        __t: Food
 *                                        ingredients: [Proteína de guisante, Dátiles, Almendras]
 *                                        weightOrVolume: 50g
 *                                        flavors: [Original, Chocolate]
 *                                        expirationDays: 90
 *                                        company: 60d5ec9a1f2a4a3d98765433
 *                                        __v: 0
 *                          automotive:
 *                              value:
 *                                  state: true
 *                                  data:  
 *                                      - _id: 60f5b9f9f8db4f32fdsds6
 *                                        id: 3001
 *                                        name: Eco-Sedan 2024
 *                                        description: Vehículo eléctrico de alto rendimiento
 *                                        category: Automóvil
 *                                        price: 45900.00
 *                                        stock: 350
 *                                        __t: Automotive
 *                                        specs:
 *                                          range: 450km
 *                                          acceleration: 4.2s 0-100km/h
 *                                          battery: "85kWh"
 *                                        warrantyYears: 3
 *                                        modelYear: 2024  
 *                                        company: 60d5ec9a1f2a4a3d98765434
 *                                        __v: 0   
 *                          clothing:
 *                              value:
 *                                  state: true
 *                                  data:    
 *                                      - _id: 60f5b9f9f8db4f32fdsds7
 *                                        id: 4001
 *                                        name: Adidas sport-Tshirt
 *                                        description: Camiseta Deportiva
 *                                        category: Prenda de Vestir
 *                                        price: 45900.00
 *                                        stock: 350
 *                                        __t: Clothing
 *                                        sizesAvaiable: [S, M, L, XL]
 *                                        colors: [Negro, Naranja, Azul]
 *                                        material: Algodón Sintetico
 *                                        company: 60d5ec9a1f2a4a3d98765435
 *                                        __v: 0
 *                            
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
 *                                               
 */
routes.post('/:id', save)

/**
 * @swagger
 * /:
 * /product/{id}:
 *  put:
 *      tags: [Product Controller]
 *      summary: Actualizar Produtcos
 *      description: Actualizar los datos de un producto según el id que se pase
 *      parameters:
 *         -    in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Identificador del producto en la BD
 *      requestBody:
 *          description: Crea un nuevo producto
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      oneOf:
 *                          - $ref: '#/components/schemas/ElectronicsProduct'
 *                          - $ref: '#/components/schemas/FoodProduct'
 *                          - $ref: '#/components/schemas/AutomotiveProduct'
 *                          - $ref: '#/components/schemas/ClothingProduct'
 *                  examples:
 *                          electronics:
 *                              value:
 *                                  id: 1001
 *                                  name: Q-Phone Pro
 *                                  description: Smartphone con procesador cuántico
 *                                  category: Electrónica
 *                                  price: 1299.99
 *                                  stock: 4500
 *                                  features: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *                                  warrantyYears: 2
 *                                        
 *                          food:
 *                              value:
 *                                  id: 2001
 *                                  name: Barrita Energética
 *                                  description: Barrita con 20g de proteína vegana
 *                                  category: Snacks
 *                                  price: 2.99
 *                                  stock: 25000
 *                                  ingredients: [Proteína de guisante, Dátiles, Almendras]
 *                                  weightOrVolume: 50g
 *                                  flavors: [Original, Chocolate]
 *                                  expirationDays: 90
 *                                        
 *                          automotive:
 *                              value:
 *                                  id: 3001
 *                                  name: Eco-Sedan 2024
 *                                  description: Vehículo eléctrico de alto rendimiento
 *                                  category: Automóvil
 *                                  price: 45900.00
 *                                  stock: 350
 *                                  specs:
 *                                  range: 450km
 *                                  acceleration: 4.2s 0-100km/h
 *                                  battery: "85kWh"
 *                                  warrantyYears: 3
 *                                  modelYear: 2024  
 *                                          
 *                          clothing:
 *                              value:
 *                                  id: 4001
 *                                  name: Adidas sport-Tshirt
 *                                  description: Camiseta Deportiva
 *                                  category: Prenda de Vestir
 *                                  price: 45900.00
 *                                  stock: 350
 *                                  sizesAvaiable: [S, M, L, XL]
 *                                  colors: [Negro, Naranja, Azul]
 *                                  material: Algodón Sintetico   
 *      responses:
 *         '201':
 *              description: Producto creado y guardado
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              state:
 *                                  type: boolean
 *                                  example: true
 *                              data:
 *                                  type: array
 *                                  oneOf:
 *                                      - $ref: '#/components/schemas/ElectronicsProduct'
 *                                      - $ref: '#/components/schemas/FoodProduct'
 *                                      - $ref: '#/components/schemas/AutomotiveProduct'
 *                                      - $ref: '#/components/schemas/ClothingProduct'
 *                                  
 *                      examples:
 *                          electronics:
 *                              value:
 *                                  state: true
 *                                  data:
 *                                     -  _id: 60f5b9f9f8db4f32fdsds4
 *                                        id: 1001
 *                                        name: Q-Phone Pro
 *                                        description: Smartphone con procesador cuántico
 *                                        category: Electrónica
 *                                        price: 1299.99
 *                                        stock: 4500
 *                                        __t: Electronics
 *                                        features: [Pantalla 6.7\" AMOLED, 256GB almacenamiento]
 *                                        warrantyYears: 2
 *                                        company: 60d5ec9a1f2a4a3d98765432
 *                                        __v: 0
 *                          food:
 *                              value:
 *                                  state: true
 *                                  data:
 *                                     -  _id: 60f5b9f9f8db4f32fdsds5
 *                                        id: 2001
 *                                        name: Barrita Energética
 *                                        description: Barrita con 20g de proteína vegana
 *                                        category: Snacks
 *                                        price: 2.99
 *                                        stock: 25000
 *                                        __t: Food
 *                                        ingredients: [Proteína de guisante, Dátiles, Almendras]
 *                                        weightOrVolume: 50g
 *                                        flavors: [Original, Chocolate]
 *                                        expirationDays: 90
 *                                        company: 60d5ec9a1f2a4a3d98765433
 *                                        __v: 0
 *                          automotive:
 *                              value:
 *                                  state: true
 *                                  data:  
 *                                      - _id: 60f5b9f9f8db4f32fdsds6
 *                                        id: 3001
 *                                        name: Eco-Sedan 2024
 *                                        description: Vehículo eléctrico de alto rendimiento
 *                                        category: Automóvil
 *                                        price: 45900.00
 *                                        stock: 350
 *                                        __t: Automotive
 *                                        specs:
 *                                          range: 450km
 *                                          acceleration: 4.2s 0-100km/h
 *                                          battery: "85kWh"
 *                                        warrantyYears: 3
 *                                        modelYear: 2024  
 *                                        company: 60d5ec9a1f2a4a3d98765434
 *                                        __v: 0   
 *                          clothing:
 *                              value:
 *                                  state: true
 *                                  data:    
 *                                      - _id: 60f5b9f9f8db4f32fdsds7
 *                                        id: 4001
 *                                        name: Adidas sport-Tshirt
 *                                        description: Camiseta Deportiva
 *                                        category: Prenda de Vestir
 *                                        price: 45900.00
 *                                        stock: 350
 *                                        __t: Clothing
 *                                        sizesAvaiable: [S, M, L, XL]
 *                                        colors: [Negro, Naranja, Azul]
 *                                        material: Algodón Sintetico
 *                                        company: 60d5ec9a1f2a4a3d98765435
 *                                        __v: 0
 *                            
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
 *                                               
 */
routes.put('/:id', actualize)

/**
 * @swagger
 * /:
 * /product/{id}:
 *  delete:
 *      tags: [Product Controller]
 *      summary: Eliminar un Producto por ID
 *      description: Eliminar un producto segun el id de la base de datos
 *      parameters:
 *         -    in: path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: Identificador del producto en la BD
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
 *                              example: ID Product Not Found  
 *                 
 */
routes.delete('/:id', eliminate)

export default routes