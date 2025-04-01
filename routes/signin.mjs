import express from 'express'
import loggin from '../controllers/controller-signin.js'

const route = express.Router()


/**
 * @swagger
 * /:
 * /signin/:
 *  post:
 *      tags: [Loggin Controller]
 *      summary: Iniciar Sesión
 *      description: Inicio de sesión
 *      requestBody:
 *          description: Con el usuario (correo) y contraseña ya creados inicia sesión
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object    
 *                      properties:
 *                          mail:
 *                              type: string
 *                              description: Correo con el cual se registro
 *                              example: example@gmail.com
 *                          password:
 *                              type: string
 *                              description: Contraseña con la que se inicia sesión
 *                              example: IsthismyP@ssw0rd
 *      responses:
 *         '200':
 *              description: 
 *              content:
 *                  application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: true
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: Logged In 
 *                            token:
 *                              type: string
 *                              description: token de acceso
 *                              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUb2tlbiIsInBhc3N3b3JkIjoicGFzd29yZDEyMzQiLCJleHAiOjE3NDM0NTU3OTQ1NDksImlhdCI6MTc0MzQ1NTE5NH0.jEm6A-T8E_Lm1BK0vo79suLV1yp0a5JUM5b_DWMEivN
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
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: User Don't Exist 
 *                            token:
 *                              type: string
 *                              description: token de acceso
 *                              example: null
 *         '403':
 *              description: El cliente no posee los permisos necesarios para cierto contenido
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: Password is Wrong
 *                            token:
 *                              type: string
 *                              description: token de acceso
 *                              example: null
 *         '500':
 *              description: Error en el servidor
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            state:
 *                              type: boolean
 *                              description: Indica si se inicio sesión o no
 *                              example: false
 *                            message:
 *                              type: string
 *                              description: Indica el resultado de la solicitud
 *                              example: E11000 duplicate key error collection           
 */                
route.post('/', loggin);

export default route