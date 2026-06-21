require('dotenv').config();
const express = require('express');
const errorFile = require('./utils/errorHelper');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const userRoute = require('./routes/userRoute');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
  res.send('Food ordering stystem! Server is running.');
});

app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/users', userRoute)


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