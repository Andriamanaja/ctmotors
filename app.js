const express = require('express') ;
const swaggerJsDoc = require('swagger-jsdoc') ;
const swaggerUI = require('swagger-ui-express') ;

const app = express() ;
app.use(express.json()) ;

const port = process.env.PORT || 3000 ;

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Simple API',
        version: '1.0.0',
        description: 'Simple API example with Swagger and Docker'
      },
      servers: [{ url: 'http://localhost:3000' }],
    },
    apis: ['./app.js'],
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

let dataStore = [];

/**
 * @swagger
 * /data:
 *   get:
 *     summary: Retrieve the list of data
 *     responses:
 *       200:
 *         description: List of data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/data', (req, res) => {
  res.status(200).json(dataStore);
});

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Add new data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 type: string
 *     responses:
 *       201:
 *         description: Data added
 */
app.post('/data', (req, res) => {
  const { item } = req.body;
  dataStore.push(item);
  res.status(201).json({ message: 'Data added', item });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});