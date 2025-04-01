import express from 'express'
import 'dotenv/config'
import routeCompany from './routes/company.mjs'
import routeProduct from './routes/products.mjs'
import routeSignin from './routes/signin.mjs'
import routeSignup from './routes/signup.mjs'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from './swagger.js'

import './driver/connect-db.mjs'

const app = new express()

//Setters
app.set('PORT',process.env.PORT || 4500)

//use
app.use(express.json())

//Swagger
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//middlewares
app.use('/company',routeCompany);
app.use('/product',routeProduct);
app.use('/signin', routeSignin);
app.use('/signup', routeSignup)

app.listen(app.get('PORT'),()=>console.log(`Server Ready at Port ${app.get('PORT')}`));
