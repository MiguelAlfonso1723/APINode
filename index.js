import express from 'express'
import 'dotenv/config'
import routeCompany from './routes/company.mjs'
import routeProduct from './routes/products.mjs'

import './driver/connect-db.mjs'

const app = new express()

//Setters
app.set('PORT',process.env.PORT || 4500)

//use
app.use(express.json())

//middlewares
app.use('/company',routeCompany);
app.use('/product',routeProduct);

app.listen(app.get('PORT'),()=>console.log(`Server Ready at Port ${app.get('PORT')}`));