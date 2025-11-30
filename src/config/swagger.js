const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Pedidos Jitterbit',
            version: '1.0.0',
            description: 'API do Desafio Técnico - Documentada via Configuração',
        },
        servers: [
            { url: 'http://localhost:3000' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        // AQUI ESTÁ A DOCUMENTAÇÃO DEFINITIVA (Sem risco de erro de indentação)
        paths: {
            '/login': {
                post: {
                    summary: 'Realiza login para obter o token',
                    tags: ['Autenticação'],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        usuario: { type: 'string', example: 'admin' },
                                        senha: { type: 'string', example: '123456' }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: { description: 'Token gerado com sucesso' }
                    }
                }
            },
            '/order': {
                post: {
                    summary: 'Cria um novo pedido',
                    tags: ['Pedidos'],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        numeroPedido: { type: 'string', example: 'v10089016vdb' },
                                        valorTotal: { type: 'number', example: 10000 },
                                        dataCriacao: { type: 'string', example: '2023-07-19T12:24:11.529Z' },
                                        items: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    idItem: { type: 'string', example: '2434' },
                                                    quantidadeItem: { type: 'integer', example: 1 },
                                                    valorItem: { type: 'number', example: 1000 }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        201: { description: 'Pedido criado com sucesso' },
                        401: { description: 'Token inválido ou não fornecido' },
                        409: { description: 'Número do pedido duplicado' }
                    }
                }
            },
            '/order/{id}': {
                get: {
                    summary: 'Busca pedido por ID',
                    tags: ['Pedidos'],
                    parameters: [{
                        in: 'path',
                        name: 'id',
                        schema: { type: 'string' },
                        required: true,
                        description: 'O ID do pedido (ex: v10089016vdb)'
                    }],
                    responses: {
                        200: { description: 'Detalhes do pedido' },
                        404: { description: 'Pedido não encontrado' }
                    }
                },
                delete: {
                    summary: 'Remove um pedido',
                    tags: ['Pedidos'],
                    parameters: [{
                        in: 'path',
                        name: 'id',
                        schema: { type: 'string' },
                        required: true
                    }],
                    responses: {
                        200: { description: 'Pedido removido com sucesso' },
                        404: { description: 'Pedido não encontrado' }
                    }
                }
            }
        }
    },
    apis: [] // Deixamos vazio intencionalmente
};

module.exports = swaggerJsDoc(swaggerOptions);