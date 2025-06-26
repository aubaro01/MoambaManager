const objModel = require ("../models/objModel");

exports.criarObjetivo = async (req, res) => {
  try {
    const { mes, valor } = req.body;

    if (!mes || !valor) {
      return res.status(400).json({ erro: "Mes e valor são obrigatórios." });
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
    const objetivos = await objModel.find();
    res.json(objetivos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar objetivos." });
  }
};

exports.getObjetivoPorMes = async (req, res) => {
  try {
    const { mes } = req.query;

    if (!mes) {
      return res.status(400).json({ erro: "O parâmetro 'mes' é obrigatório." });
    }

    const objetivos = await Objetivo.find({ mes: mes });

    if (objetivos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum objetivo encontrado para esse mês." });
    }

    res.json(objetivos);
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
