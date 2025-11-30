const express = require('express');
const { sequelize } = require('./src/models');
const orderRoutes = require('./src/routes/orderRoutes');

// --- Importações do Swagger (NOVAS) ---
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swagger'); // Certifique-se que este arquivo existe (passo 2)

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Rota da Documentação 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', orderRoutes);

sequelize.sync()
    .then(() => {
        console.log('Banco SQLite Sincronizado');
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            // Esta mensagem agora deve aparecer:
            console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(err => console.error('Erro ao iniciar banco:', err));