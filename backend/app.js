require('dotenv').config();
const express = require('express');
const errorFile = require('./utils/errorHelper');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const userRoute = require('./routes/userRoute');
const morgan = require('morgan');
const connectDB = require('./config/db');
const app = express();
app.use(express.json());
app.use(morgan('dev'));


connectDB();

app.get('/', (req, res) => {
  res.send('Food ordering stystem! Server is running.');
});

app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/user', userRoute)


app.use((error, req, res, next) => {
  error.status = error.status || 500;

  // Log 
  errorFile.write({
    message: error.message,
    stack: error.stack,
    time: new Date()
  });

  // Client Response 
  res.status(error.status).json({
    success: false,
    message: error.message || "Internal Server Error"
  });
});


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});