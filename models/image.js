const Sequelize = require('sequelize')
const databaseServer = require('../integration/sql').getDatabaseInstance()
/*
  Thông tin hình ảnh cho sản phẩm.  
  Lien ket voi bang Product: 1 - 1,
*/
const image = databaseServer.define('image', {
    /*
      Id tự tăng
    */
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    idProduct: {
        allowNull: false,
       type: Sequelize.INTEGER
    },
    url: {
        allowNull: false,
        type: Sequelize.TEXT,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }
})

async function addImages(arrayPics, idProduct){
    try {
        const listOfImages = [];
        arrayPics.forEach(image => {
            listOfImages.push({
                idProduct: parseInt(idProduct),
                url: image
            })
        })
        const images = await image.bulkCreate(listOfImages)
        return [null, images]
    } catch (error) {
        return [error, null]
    }
    
}
async function listImagesById(idProduct) {
    try {
        const images = await image.findAll({
            where: {idProduct}
        })
        return [null, images]
    } catch (error) {
        return [error, null]
    }
}
module.exports = {
    image,
    addImages,
    listImagesById
}