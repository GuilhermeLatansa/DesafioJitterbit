const jwt = require('jsonwebtoken');
const SECRET_KEY = 'minha_chave_secreta_super_segura';

exports.login = (req, res) => {
    const { usuario, senha } = req.body;

    // Simulação de verificação de usuário
    if (usuario === 'admin' && senha === '123456') {
        // Cria o token que expira em 1 hora
        const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ message: "Usuário ou senha incorretos" });
};