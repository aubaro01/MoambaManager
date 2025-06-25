const User = require ("../models/userModel");

const register = async (req, res) => {
    const { nome, logName, password } = req.body;

    try {
        // Verifica se logName já existe
        const existingUser = await User.findOne({ logName });
        if (existingUser) {
            return res.status(400).json({ message: "Nome de login já está em uso." });
        }

        const newUser = new User({ nome, logName, password });
        await newUser.save();

        res.status(201).json({ message: "Utilizador registrado com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar utilizador." });
    }
};


// Login do usuário
const login = async (req, res) => {
    const { logName, password } = req.body;

    try {
        const user = await User.findOne({ logName });
        if (!user) {
            return res.status(401).json({ message: "Utilizador não encontrado." });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Senha incorreta." });
        }

        // gerar token JWT
        res.status(200).json({ message: "Login bem-sucedido!", userId: user._id });
    } catch (err) {
        res.status(500).json({ error: "Erro no login." });
    }
};

module.exports = {
    register,
    login,
};