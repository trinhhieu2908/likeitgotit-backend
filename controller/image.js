const { uploadFile } = require('../integration/firebase')
const image = require('../models/image')
async function addImages(req,res) {
    const idProduct = req.params.id
    //check missing id
    if(!idProduct) {
        return res.json({
                    errorMsg: "Missing id product",
                    data: null
        })
    }
    const images = req.files
    let listOfPath = []
    images.forEach(image => {
        let imagePath = image.destination + image.filename
        listOfPath.push(imagePath)
    });
    // upload image
    const listOfUrl = await uploadFile(listOfPath)
    if(listOfUrl[0] && listOfUrl[1].length > 1){
        return res.json({
            errorMsg: listOfUrl[0],
            data: null
        })
    }
    // send to model image
    const listOfImages = await image.addImages(listOfUrl[1], idProduct)
    if(listOfImages[0]){
        return res.json({
            errorMsg: listOfImages[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: listOfImages[1]
    })
}
async function listImagesById(req,res) {
    const idProduct = req.params.id
    if(!idProduct) {
        return res.json({
                    errorMsg: "Missing id product",
                    data: null
        })
    }
    const images = await image.listImagesById(idProduct)
    if(images[0]){
        return res.json({
            errorMsg: images[0].message,
            data: null
        })
    }
    return res.json({
        errorMsg: null,
        data: images[1]
    })
}
module.exports = {
    addImages,
    listImagesById
}