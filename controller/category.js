const category = require('../models/category')
async function addCategory(req,res) {
    const name = req.body.name
    if(!name.trim()) {
        return res.json({
            errorMsg: "Missing name of category",
            data: null
    })  
    }
    const cg = await category.addCategory(name)
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
async function updateCategory(req, res) {
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
                errorMsg: "Missing name of category",
                data: null
        })  
        }
        // allow update 
        const cg = await category.updateCategory(body, id)
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
async function deleteCategory(req, res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id category",
                    data: null
        })
    }
    const cg = await category.deleteCategory(id)
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
async function listAllCategory(req, res) {
    const cg = await category.listAllCategory()
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
async function listCategoryById(req,res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id category",
                    data: null
        })
    }
    const cg = await category.listCategoryById(id)
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
    addCategory,
    updateCategory,
    deleteCategory,
    listAllCategory,
    listCategoryById
}