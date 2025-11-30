const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Order = sequelize.define('Order', {
    orderId: {
        type: DataTypes.STRING,
        primaryKey: true, 
        allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: false });


const Item = sequelize.define('Item', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, { timestamps: false });


Order.hasMany(Item, { foreignKey: 'orderId', as: 'items' });
Item.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = { Order, Item, sequelize };