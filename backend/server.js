const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.Mongo_url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.send('Database connection status: Connected');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});