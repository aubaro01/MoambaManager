const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const authRoute = require("./server/routes/userRoute");
const productRoute = require("./server/routes/productRoute");
const sellsRoute = require("./server/routes/sellRoute");
const app = express();
require('dotenv').config(); 

app.use(express.json()); 

app.use(cors({
  origin: process.env. REACT_APP_API_URL
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Rotas
app.use("/api/v1", authRoute)
app.use("/api/v1", productRoute)
app.use("/api/v1/", sellsRoute)

// Rota para ver a app está on
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API online!!' });
});

module.exports = (req, res) => {
  app(req, res);  
};