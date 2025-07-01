const objModel = require("../models/objModel");
const paginatedResponse = require("../utils/paginationResponse");


exports.criarObjetivo = async (req, res) => {
  try {
    const { mes, valor } = req.body;

    if (!mes || !valor) {
      return res.status(400).json({ erro: "Mês e valor são obrigatórios." });
    }

    const novoObjetivo = new objModel({ mes, valor });
    await novoObjetivo.save();

    res.status(201).json(novoObjetivo);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar objetivo.", detalhes: err.message });
  }
};

exports.listarObjetivos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await objModel.countDocuments();
    const data = await objModel.find().skip(skip).limit(limit);

    res.json(paginatedResponse({ data, total, page, limit }));
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar objetivos." });
  }
};

exports.getObjetivoPorMes = async (req, res) => {
  try {
    const { mes } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!mes) {
      return res.status(400).json({ erro: "O parâmetro 'mês' é obrigatório." });
    }

    const total = await objModel.countDocuments({ mes });
    const data = await objModel.find({ mes }).skip(skip).limit(limit);

    if (data.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum objetivo encontrado para esse mês." });
    }

    res.json(paginatedResponse({ data, total, page, limit }));
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar objetivo por mês.", detalhes: err.message });
  }
};

exports.atualizarObjetivo = async (req, res) => {
  try {
    const { mes, valor } = req.body;
    const objetivoAtualizado = await objModel.findByIdAndUpdate(
      req.params.id,
      { mes, valor },
      { new: true, runValidators: true }
    );
    if (!objetivoAtualizado) {
      return res.status(404).json({ erro: "Objetivo não encontrado." });
    }
    res.json(objetivoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar objetivo." });
  }
};

exports.deletarObjetivo = async (req, res) => {
  try {
    const objetivoDeletado = await objModel.findByIdAndDelete(req.params.id);
    if (!objetivoDeletado) {
      return res.status(404).json({ erro: "Objetivo não encontrado." });
    }
    res.json({ mensagem: "Objetivo deletado com sucesso." });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao deletar objetivo." });
  }
};
