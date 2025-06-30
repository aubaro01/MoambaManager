const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

const authRoute = require("./routes/userRoute");
app.use("/api/v1", authRoute);

const productRoute = require("./routes/productRoute");
app.use("/api/v1", productRoute);

const sellsRoute = require("./routes/sellRoute");
app.use("/api/v1", sellsRoute);

const objRoute = require("./routes/objRoute");
app.use("/api/v1", objRoute);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API online!!' });
});

module.exports = (req, res) => {
  app(req, res);
};
