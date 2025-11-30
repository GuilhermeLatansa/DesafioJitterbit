const jwt = require('jsonwebtoken');
const SECRET_KEY = 'minha_chave_secreta_super_segura'; // Em produção, isso iria no .env

module.exports = (req, res, next) => {
    // Tenta pegar o token do cabeçalho da requisição
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <TOKEN>"

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next(); // Pode passar, token válido!
    } catch (error) {
        res.status(403).json({ message: "Token inválido." });
    }
};