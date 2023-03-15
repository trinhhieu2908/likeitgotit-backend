const productOption = require('../models/productOption')
const product = require('../models/product')
async function addProductOption(req,res) {
    const { idProduct, idSize } = req.body
    //check missing id
    if(!idProduct || !idSize) {
        return res.json({
                    errorMsg: "Missing idProduct or idSize product",
                    data: null
        })
    }
    const pdOp = await productOption.addProductOption(
        idProduct,
        idSize
    )
    if(pdOp[0]){
        return res.json({
            errorMsg: pdOp[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: pdOp[1]
    })
}
async function getProductOptionById(req, res) {
    const idProduct = req.params.id
    if(!idProduct) {
        return res.json({
                    errorMsg: "Missing idProductOption",
                    data: null
        })
    }
    const pdOp = await productOption.getProductOptionById(idProduct)
    
    if(pdOp[0]){
        return res.json({
            errorMsg: pdOp[0].message,
            data: null
        })
    }
    const pd = await product.listProductById(pdOp[1].idProduct)
    if(pd[0]){
        return res.json({
            errorMsg: pd[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: {
            "id": pd[1].id,
            "idCategory": pd[1].idCategory,
            "idBrand": pd[1].idBrand,
            "name": pd[1].name,
            "price": pd[1].price,
            "saleOff": pd[1].saleOff,
            "priceAfterSale": pd[1].priceAfterSale,
            "desc": pd[1].desc,
            "hot": pd[1].hot,
            "images": pd[1].images,
            "brand": pd[1].brand,
            "category": pd[1].category,
            "productOption": pdOp[1]
        }
    })
}
module.exports = {
    addProductOption,
    getProductOptionById
}