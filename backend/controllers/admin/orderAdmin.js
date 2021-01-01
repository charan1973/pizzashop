const Order = require("../../models/Order")

exports.getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({paymentStatus: true}, "-paymentDetails")
        return res.json({orders})
    }catch(err){
        return res.json({error: "Error fetching orders"})
    }
}

exports.updateOrderStatus = async (req, res) => {
    const {orderId, status} = req.body
    const possibleStatus = ["completed", "delivered", "cancelled", "accepted", "pending"]

    if(!possibleStatus.includes(status)) return res.json({error: "Cannot update status"})
    
    try{
        const findOrder = await Order.findById(orderId)
        findOrder.orderStatus = status
        findOrder.save()
        return res.json({message: `Order status updated to ${status}`})
    }catch(err){
        return res.json({error: "Error updating status"})
    }

}