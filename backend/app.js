import express from 'express';
import errorFile from './utils/errorHelper';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! Server is running.');
});

app.use((error, req, res, next) => {
  error.status = error.status || 400;

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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});