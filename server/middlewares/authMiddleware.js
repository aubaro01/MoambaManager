const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];
    console.log(`${token}`);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("Token recebido:", token);
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
};

const refreshToken = (req, res) => {
    const authHeader = req.headers['refresh-token'];

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Refresh token não fornecido." });
    }

    const tokenSplit = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(tokenSplit, process.env.JWT_REFRESH);

        const token = jwt.sign(
            { id: decoded.id, nome: decoded.nome },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return res.json({ token });

    } catch (err) {
        return res.status(403).json({ message: "Refresh token inválido ou expirado." });

    }
};

module.exports = {
    verifyToken,
    refreshToken
};
