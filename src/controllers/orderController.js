const { Order, Item } = require('../models');
const OrderViewModel = require('../viewmodels/orderMapper');

exports.createOrder = async (req, res) => {
    try {
       
        const orderData = OrderViewModel.toDatabase(req.body);
        
     
        const newOrder = await Order.create(orderData, {
            include: [{ model: Item, as: 'items' }]
        });

        res.status(201).json({ 
            message: "Pedido criado com sucesso", 
            data: OrderViewModel.toResponse(newOrder) 
        });
    } catch (error) {
      
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: "Número do pedido já existe." });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        
        const order = await Order.findByPk(id, {
            include: [{ model: Item, as: 'items' }]
        });

        if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

        res.status(200).json(OrderViewModel.toResponse(order));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Order.destroy({ where: { orderId: id } });

        if (!deleted) return res.status(404).json({ message: "Pedido não encontrado" });

        res.status(200).json({ message: "Pedido deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};