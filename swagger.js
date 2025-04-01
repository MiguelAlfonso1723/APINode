import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {

    openapi: '3.0.0',
    info:{
        title : 'API Companys Products',
        version: '1.0.0',
        description: 'API de productos de Compañias',
        license:{
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html'
        },
        contact:{
            name: 'Migue Alfonso',
            url: 'https://github.com/MiguelAlfonso1723'
        }
    },
    tags:[{
        name: "Loggin Controller",
        description: "Creación de usuario e inicio de sesión"
    },
    {
        name: "Company Controller",
        description: "Gestión y administración de compañías varias"
    },
    {
        name: "Product Controller",
        description: "Gestión y administración de productos pertenecientes a compañías varias"
    }],
    servers:[{
        url: 'https://apinodejs-2h6b.onrender.com',
        description: 'Development API Companies and Products'
    }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Ingresa el token JWT en el formato: Bearer <token>'
            }
        }
    },
    security: [{
        bearerAuth: []
    }]
    
}


const options = {
    swaggerDefinition,
    apis:['./routes/*.mjs']
}

const swaggerSepc = swaggerJSDoc(options);

export default swaggerSepc;