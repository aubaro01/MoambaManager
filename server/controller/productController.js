const Product = require("../models/productsModel");
const paginatedResponse = require("../utils/paginationResponse");

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); 
    const savedProduct = await newProduct.save(); 
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar produto", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); 
    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erro ao procurar por produto", error });
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const { nome } = req.query;

    if (!nome) {
      return res.status(400).json({ message: "Parâmetro 'nome' é obrigatório." });
    }

    const produtos = await Product.find({
      nome: { $regex: nome, $options: 'i' } 
    });

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos pelo nome", error });
  }
};

exports.getEnums = (req, res) => {
  try {
    const enums = Product.getEnums();
    res.json(enums);
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter enums", error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const data = await Product.find().skip(skip).limit(limit);

    res.json(paginatedResponse({ data, total, page, limit }));
  } catch (error) {
    res.status(500).json({ message: "Erro ao procurar por produtos", error });
  }
};

exports.CountAllProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.status(200).json({ totalProducts: count });
  } catch (error) {
    console.error("Erro ao procurar por todos os produtos:", error);
    res.status(500).json({ error: "Erro ao contar o número de produtos." });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar produto", error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar produto", error });
  }
};
