const Sells = require('../models/sellsModel');
const Product = require('../models/productsModel');
const paginatedResponse = require("../utils/paginationResponse");

exports.createSell = async (req, res) => {
  try {
    const { products, precoTotal, clientDados } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Nenhum produto informado na venda.' });
    }

    // Verifica estoque para todos os produtos
    for (const item of products) {
      const produto = await Product.findById(item.product);
      if (!produto) {
        return res.status(404).json({ message: `Produto ${item.product} não encontrado.` });
      }
      if (produto.estoque < item.quantidade) {
        return res.status(400).json({ message: `Estoque insuficiente para o produto: ${produto.nome}` });
      }
    }

    // Atualiza o estoque de todos os produtos
    for (const item of products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { estoque: -item.quantidade }
      });
    }

    const novaVenda = new Sells({
      products,
      precoTotal,
      clientDados
    });

    const vendaSalva = await novaVenda.save();

    res.status(201).json(vendaSalva);
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    res.status(500).json({ message: 'Erro interno ao criar venda', error });
  }
};

exports.getAllSells = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Sells.countDocuments();
    const vendas = await Sells.find()
      .skip(skip)
      .limit(limit)
      .populate('products.product');

    res.json(paginatedResponse({ data: vendas, total, page, limit }));
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar vendas', error });
  }
};

exports.CountAllSells = async (req, res) => {
  try {
    const count = await Sells.countDocuments();
    res.status(200).json({ totalProducts: count });
  } catch (error) {
    console.error("Erro ao  contar o número total de vendas:", error);
    res.status(500).json({ error: "Erro ao contar todas as vendas." });
  }
};

exports.getSellById = async (req, res) => {
  try {
    const venda = await Sells.findById(req.params.id).populate('products.product');
    if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });
    res.json(venda);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar venda', error });
  }
};

exports.getSellsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Por favor, informe startDate e endDate no formato ISO.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ message: 'Datas inválidas.' });
    }

    end.setHours(23, 59, 59, 999);

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { vendidoEm: { $gte: start, $lte: end } };

    const total = await Sells.countDocuments(filter);
    const vendas = await Sells.find(filter)
      .skip(skip)
      .limit(limit)
      .populate('products.product');

    res.json(paginatedResponse({ data: vendas, total, page, limit }));
  } catch (error) {
    console.error('Erro ao buscar vendas por data:', error);
    res.status(500).json({ message: 'Erro interno ao buscar vendas por data', error });
  }
};

exports.updateSell = async (req, res) => {
  // Atenção: essa função **não ajusta o estoque automaticamente**.
  try {
    const vendaAtualizada = await Sells.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendaAtualizada) return res.status(404).json({ message: 'Venda não encontrada' });
    res.json(vendaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar venda', error });
  }
};

exports.deleteSell = async (req, res) => {
  // Atenção: essa função **não reverte o estoque automaticamente**.
  try {
    const vendaDeletada = await Sells.findByIdAndDelete(req.params.id);
    if (!vendaDeletada) return res.status(404).json({ message: 'Venda não encontrada' });
    res.json({ message: 'Venda deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar venda', error });
  }
};
