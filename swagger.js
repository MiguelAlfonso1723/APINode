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
    servers:[{
        url: 'http://localhost:3000',
        description: 'Development Company'
    },
    {
        url: 'http://localhost:3000/product/',
        description: 'Development Products'
    }]
    
}

const options = {
    swaggerDefinition,
    apis:['./routes/*.mjs']
}

const swaggerSepc = swaggerJSDoc(options);

export default swaggerSepc;