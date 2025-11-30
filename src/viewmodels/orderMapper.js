class OrderViewModel {
   
    static toDatabase(inputJson) {
        return {
            orderId: inputJson.numeroPedido,
            value: inputJson.valorTotal,
            creationDate: inputJson.dataCriacao,
            items: inputJson.items.map(item => ({
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
    }

    
    static toResponse(dbRecord) {
        
        const order = dbRecord.toJSON ? dbRecord.toJSON() : dbRecord;
        
        return {
            orderId: order.orderId,
            value: order.value,
            creationDate: order.creationDate,
            items: order.items ? order.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            })) : []
        };
    }
}

module.exports = OrderViewModel;