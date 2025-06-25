const Sells = require('../models/sellsModel');
const Product = require('../models/productsModel');

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
    const vendas = await Sells.find().populate('products.product');
    res.json(vendas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar vendas', error });
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
