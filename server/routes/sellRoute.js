const express = require('express');
const router = express.Router();
const Sells = require('../models/sellsModel');
const Product = require('../models/productsModel');
const sellsController = require('../controller/sellController');

const verifyToken = require('../middlewares/authMiddleware');

router.post('/sells', verifyToken, sellsController.createSell);

router.get('/sells', verifyToken, async (req, res) => {
  try {
    const vendas = await Sells.find().populate('products.product');
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar vendas', error });
  }
});

router.get('/sells/:id', verifyToken, async (req, res) => {
  try {
    const venda = await Sells.findById(req.params.id).populate('products.product');
    if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });
    res.json(venda);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar venda', error });
  }
});

router.put('/sells/:id', verifyToken, async (req, res) => {
  try {
    const vendaAtualizada = await Sells.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendaAtualizada) return res.status(404).json({ message: 'Venda não encontrada' });
    res.json(vendaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar venda', error });
  }
});

router.delete('/sells/:id', verifyToken, async (req, res) => {
  try {
    const vendaDeletada = await Sells.findByIdAndDelete(req.params.id);
    if (!vendaDeletada) return res.status(404).json({ message: 'Venda não encontrada' });
    res.json({ message: 'Venda deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar venda', error });
  }
});

module.exports = router;
