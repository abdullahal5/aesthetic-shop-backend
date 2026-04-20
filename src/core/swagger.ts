import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AuraStore API',
    version: '1.0.0',
    description: 'Backend API documentation for AuraStore',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server',
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/app.ts'], // where your docs will live
};

export const swaggerSpec = swaggerJSDoc(options);
