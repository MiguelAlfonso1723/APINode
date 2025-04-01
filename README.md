# CompanyAPI
Taller de una API RESTFULL para gestionar compañías 📈 y productos varios 🎁  
Hecho por: Miguel Angel Alfonso Saavedra - 202012145 👨🏻‍💻  
Link del despliegue en nube: https://apinodejs-2h6b.onrender.com/docs 💻  

# Información Adicional
Para interactuar con la API se uso la UI de swagger.  
El repositorio se desplego con Render a tráves de una conexión con Github y én el caso de la base de datos fue con Mongodb Atlas.

## Dependencias
Para la instalación de las dependencias investigar la documentación correspondiente.
- Express
- dotenv
- nodemon
- mongoose
- jsonwebtoken
- swagger-jsdoc
- swagger-ui-express
  
## Compañías

### Schema Company
```json
{
  id:Number,
  name:String,
  industry:String,
  numberIndustry:Number,
  headquarters:String,
  founded:Date,
  employees:Number,
  anualRevenue:5000000,
  products : [Product],
  
}
```

### End - Points (Locales)
- http://127.0.0.1:3000/company - GET. Recupera todos las compañías
- http://127.0.0.1:3000/company/:id - GET. Busca por ID
- http://127.0.0.1:3000/company/ - POST. Adiciona un nuevo registro
- http://127.0.0.1:3000/company/:id - PUT. Actualiza un registro
- http://127.0.0.1:3000/company/:id - DELETE. Elimina un regsitro

### End - Points (Nube)
- https://apinodejs-2h6b.onrender.com/company - GET. Recupera todos las compañías
- https://apinodejs-2h6b.onrender.com/company/:id - GET. Busca por ID
- https://apinodejs-2h6b.onrender.com/company/ - POST. Adiciona un nuevo registro
- https://apinodejs-2h6b.onrender.com/company/:id - PUT. Actualiza un registro
- https://apinodejs-2h6b.onrender.com/company/:id - DELETE. Elimina un regsitro

## Productos
Los productos tienen 4 variantes o tipos, estos son según la industria a la que pertenecen.
- Tecnología (Electronicos, Electrodomesticos, ... 💻📱🕹️🖨️🎮)
- Alimenticios (Comidas, Bebidas, Snacks, ... 🍎🥞🍕☕🥛🍺🍬🍫)
- Automotrices (Carros, Motos, ... 🚗🚕🏍️🛵🚲🛺🚚🚜)
- Textil (Ropa, Zapatos, ... 👕👚👖🩲👗🧢👒🕶️👞👟)

### Schema Product

Tecnología:  
```json
{
  id:Number,
  name:String,
  description:String,
  category:String,
  price:Number,
  stock:Number,
  features: [String],
  warrantyYears: Number,
  company: Company,
}
```

Alimeticios:
```json
{
  id:Number,
  name:String,
  description:String,
  category:String,
  price:Number,
  stock:Number,
  ingredients: [String],
  weightOrVolume:String,
  flavors: [String],
  expirationDays: Number,
  company: Company,
}
```

Automotriz:
```json
{
  id:Number,
  name:String,
  description:String,
  category:String,
  price:Number,
  stock:Number,
  specs: Object,
  warrantyYears:Number,
  modelYear:Number,
  expirationDays: Number,
  company: Company,
}
```

Textil:
```json
{
  id:Number,
  name:String,
  description:String,
  category:String,
  price:Number,
  stock:Number,
  sizesAvaiable: [String],
  colors: [String],
  material:String,
  company: Company,
}
```

### End - Points (Locales)
- http://127.0.0.1:3000/product - GET. Recupera todos los Productos
- http://127.0.0.1:3000/product/:id - GET. Busca por ID
- http://127.0.0.1:3000/product/ - POST. Adiciona un nuevo registro
- http://127.0.0.1:3000/product/:id - PUT. Actualiza un registro
- http://127.0.0.1:3000/product/:id - DELETE. Elimina un regsitro

### End - Points (Nube)
- https://apinodejs-2h6b.onrender.com/product - GET. Recupera todos los Productos
- https://apinodejs-2h6b.onrender.com/product/:id - GET. Busca por ID
- https://apinodejs-2h6b.onrender.com/product/ - POST. Adiciona un nuevo registro
- https://apinodejs-2h6b.onrender.com/product/:id - PUT. Actualiza un registro
- https://apinodejs-2h6b.onrender.com/product/:id - DELETE. Elimina un regsitro

# Referencias y Links
Para la realiación del taller se hizo una investigación para mejorar la API, entre lo se investigo y aplico fue lo siguiente:  
- Para realizar discriminadores en el modelo del esquema Productos.  
Nienke, Introducción a los discriminadores de mangosta en Express.js, 2018, https://dev.to/helenasometimes/getting-started-with-mongoose-discriminators-in-expressjs--22m9.

- Al eliminar un producto tambien se elimine del array de productos de la compañia correspondiente.  
mdn Web docs, Array.prototype.splice(),  https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice.

- Para activar el "Authorize" en Swagger para usar una autenticación tipo Bearer con tokens jwt.  
Swagger, Bearer Authentication, https://swagger.io/docs/specification/v3_0/authentication/bearer-authentication/.

- Al haber tantas peticiones se ve algo desordenado, por tanto se implementaron grupos en Swagger para verse mejor.  
Swagger, Grouping Operations With Tags, https://swagger.io/docs/specification/v3_0/grouping-operations-with-tags/.

- Con respecto a los response de las solicitudes se investigó los códigos de respuesta para implementarlos correctamente.  
mdn Web docs, Códigos de estado de respuesta HTTP, https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status.

- Al momento de documentar hubo problemas al tener diferentes tipos de productos pero esto se soluciono al usar una sección de componentes.  
Swagger, Components Section, https://swagger.io/docs/specification/v3_0/components/.
