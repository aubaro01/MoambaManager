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

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 20000 
})
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

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

// 🟡 Exportar app para uso com serverless 
module.exports = app;

//  iniciar servidor localmente (se não for serverless)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor a correr em http://localhost:${PORT}`);
  });
}
