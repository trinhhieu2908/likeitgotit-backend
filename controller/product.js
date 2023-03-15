const product = require('../models/product')
async function addProduct(req,res) {
    const body = req.body
    const priceAfterSale = body.price * ((100 - body.saleOff)/100)
    const pd = await product.addProduct({
        ...body,
        priceAfterSale
    }
    )
    if(pd[0]){
        return res.json({
            errorMsg: pd[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: pd[1]
    })
}

async function listAllProducts(req,res) {
    const skip = req.query.skip || 0
    const limit = req.query.limit || 5
    const search = req.query.search || ""
    const idCategory = req.params.id
    const pd = await product.listAllProducts(skip, limit, idCategory, search)
    if(pd[0]){
        return res.json({
            errorMsg: pd[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: pd[1]
    })
}
async function updateProduct(req,res) {
    const body = req.body
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id product",
                    data: null
        })
    }
    const updateFields = ["idCategory", "idBrand", "name", "price", "priceAfterSale", "saleOff", "desc", "hot"]
    const inputUpdateFields = Object.keys(body)
    const isInFields = inputUpdateFields.every(field => updateFields.includes(field))
    if(isInFields && inputUpdateFields.length > 0) {
        // allow update 
        const pd = await product.updateProduct(body, id)
        if(pd[0]){
            return res.json({
                errorMsg: pd[0].message,
                data: null
            })
        }
        return res.json({
            errorMsg: null,
            data: pd[1]
        })
    }
    // not allow update
    return res.json({
        errorMsg: "Not allow update some fields",
        data: null
    })
}
async function deleteProduct(req,res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id product",
                    data: null
        })
    }
    const pd = await product.deleteProduct(id)
    if(pd[0]){
        return res.json({
            errorMsg: pd[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: pd[1]
    })
}
async function listProductById(req,res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id product",
                    data: null
        })
    }
    const pd = await product.listProductById(id)
    if(pd[0]){
        return res.json({
            errorMsg: pd[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: pd[1]
    })
}
module.exports = {
    addProduct,
    listAllProducts,
    updateProduct,
    deleteProduct,
    listProductById
}