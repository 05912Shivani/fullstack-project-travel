const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const tourRoutes = require('./routes/tourRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();// Load environment variables from .env file

const app = express();
// Middleware to parse JSON data in requests
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS) to allow frontend to access the API
app.use(cors());
// Swagger API documentation setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Travel Tour API',
    version: '1.0.0',
    description: 'API documentation for Travel Tour app',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],// Points to the routes where API documentation is defined
};

const swaggerSpec = swaggerJsdoc(options);
// Setting up the API documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Connecting to MongoDB using the connection string from .env file
    mongoose.connect(process.env.MONGO_URI);

    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);// Stop the application if database connection fails
  }
};
// Use tourRoutes for handling tour-related API requests
app.use('/tour', tourRoutes);

const PORT = process.env.PORT || 3000;// Use port from .env or default to 3000
// Start the server after connecting to the database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
