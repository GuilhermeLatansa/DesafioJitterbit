const express = require('express');
const { sequelize } = require('./src/models');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', orderRoutes);


sequelize.sync()
    .then(() => {
        console.log('Banco SQLite Sincronizado');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Erro ao iniciar banco:', err));