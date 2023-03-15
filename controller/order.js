const order = require('../models/order')
const productDetail = require('../models/productDetail')
const {sendMail} = require('../integration/email')
async function addOrder(req,res) {
    const body = req.body
    const orderBody = {
        "id": body.id, 
        "emailCustomer": body.emailCustomer,
        "quantity": body.numberOfProduct,
        "totalPrice": body.totalPrice,
        "fullName": body.fullName,
    }
    const pdDetailBody = body.productDetail
    const od = await order.addOrder(orderBody)
    const pdDetail = await productDetail.addProductDetail(pdDetailBody)
    if(od[0] || pdDetail[0]){
        return res.json({
            errorMsg: od[0].message,
            data: null
        })
    }
    const result = await sendMail(body.emailCustomer, body.fullName)
    console.log("result send mail: ",result)
    return res.json({
        errorMsg: null,
        data: {"order": od[1], 
            "productDetail": pdDetail[1]}
    })
}
module.exports = {
    addOrder
}