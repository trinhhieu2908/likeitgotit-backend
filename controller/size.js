const size = require('../models/size')
async function addSize(req,res) {
    const name = req.body.name
    if(!name.trim()) {
        return res.json({
            errorMsg: "Missing name of size",
            data: null
    })  
    }
    const cg = await size.addSize(name)
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
async function updateSize(req, res) {
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
                errorMsg: "Missing name of size",
                data: null
        })  
        }
        // allow update 
        const cg = await size.updateSize(body, id)
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
async function deleteSize(req, res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id size",
                    data: null
        })
    }
    const cg = await size.deleteSize(id)
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
async function listAllSize(req, res) {
    const cg = await size.listAllSize()
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
async function listSizeById(req,res) {
    const id = req.params.id
    //check missing id
    if(!id) {
        return res.json({
                    errorMsg: "Missing id size",
                    data: null
        })
    }
    const cg = await size.listSizeById(id)
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
    addSize,
    updateSize,
    deleteSize,
    listAllSize,
    listSizeById
}