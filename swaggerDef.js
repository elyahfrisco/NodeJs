const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Moveasy',
      version: '1.0.0',
      description: 'Description de Moveasy',
    },
  },
  apis: ['./routes/*.js'], // Chemin vers vos fichiers de routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
