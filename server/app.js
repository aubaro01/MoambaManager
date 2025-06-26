const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
require('dotenv').config(); 

app.use(express.json());

app.use(cors({
  origin: process.env.REACT_APP_API_URL
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
  });

// Rotas
const authRoute = require("./routes/userRoute");
app.use("/api/v1", authRoute);

const productRoute = require("./routes/productRoute");
app.use("/api/v1", productRoute);

const sellsRoute = require("./routes/sellRoute");
app.use("/api/v1/", sellsRoute);

const objRoute = require("./routes/objRoute");
app.use("/api/v1", objRoute);

// Rota para ver se a API está on
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API online!!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
