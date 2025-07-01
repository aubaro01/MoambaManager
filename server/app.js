const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 20000
}).then(() => {
  console.log('✅ Conectado ao MongoDB com sucesso');

  // Carregar rotas
  const authRoute = require("./routes/userRoute");
  const productRoute = require("./routes/productRoute");
  const sellsRoute = require("./routes/sellRoute");
  const objRoute = require("./routes/objRoute");

  app.use("/api/v1", authRoute);
  app.use("/api/v1", productRoute);
  app.use("/api/v1", sellsRoute);
  app.use("/api/v1", objRoute);

  app.get('/', (req, res) => {
    res.status(200).json({ message: 'API online!!' });
  });
}).catch((err) => {
  console.error('❌ Erro ao conectar ao MongoDB:', err);
});

// Usar adaptador para Vercel ou AWS
const serverlessExpress = require('@vendia/serverless-express');
module.exports = serverlessExpress({ app });
