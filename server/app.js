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
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000 
})
.then(() => {
  console.log('✅ Conectado ao MongoDB com sucesso');

  // Agora sim: carrega as rotas só após conexão
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

  // Se não for serverless, inicia o servidor
  if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  }

})
.catch((err) => {
  console.error('❌ Erro ao conectar ao MongoDB:', err);
});
