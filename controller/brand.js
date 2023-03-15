const brand = require('../models/brand')
async function addBrand(req,res) {
    const name = req.body.name
    if(!name.trim()) {
        return res.json({
            errorMsg: "Missing name of brand",
            data: null
    })  
    }
    const cg = await brand.addBrand(name)
    if(cg[0]){
        return res.json({
            errorMsg: cg[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: cg[1]
    })
}
async function updateBrand(req, res) {
    const body = req.body
    const id = req.params.id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id product",
                    data: null
        })
    }
    const updateFields = ["name"]
    const inputUpdateFields = Object.keys(body)
    const isInFields = inputUpdateFields.every(field => updateFields.includes(field))
    if(isInFields && inputUpdateFields.length > 0) {
        if(!req.body.name.trim()) {
            return res.json({
                errorMsg: "Missing name of brand",
                data: null
        })  
        }
        // allow update 
        const cg = await brand.updateBrand(body, id)
        if(cg[0]){
            return res.json({
                errorMsg: cg[0].message,
                data: null
            })
        }
        return res.json({
            errorMsg: null,
            data: cg[1]
        })
    }
    // not allow update
    return res.json({
        errorMsg: "Not allow update some fields",
        data: null
    })

}
async function deleteBrand(req, res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id brand",
                    data: null
        })
    }
    const cg = await brand.deleteBrand(id)
    if(cg[0]){
        return res.json({
            errorMsg: cg[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: cg[1]
    })
}
async function listAllBrand(req, res) {
    const cg = await brand.listAllBrand()
    if(cg[0]){
        return res.json({
            errorMsg: cg[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: cg[1]
    })
}
async function listBrandById(req,res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id brand",
                    data: null
        })
    }
    const cg = await brand.listBrandById(id)
    if(cg[0]){
        return res.json({
            errorMsg: cg[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: cg[1]
    })
}
module.exports = {
    addBrand,
    updateBrand,
    deleteBrand,
    listAllBrand,
    listBrandById
}