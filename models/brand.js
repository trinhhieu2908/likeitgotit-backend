const Sequelize = require('sequelize')
const databaseServer = require('../integration/sql').getDatabaseInstance()
/*
  Thông tin nhãn hàng cho sản phẩm.  
  Lien ket voi bang Product: 1 - 1,
*/
const brand = databaseServer.define('brand', {
    /*
      Id tự tăng
    */
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    name: {
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
async function addBrand(name) {
    try {
        const cg = await brand.create({ name })
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
async function updateBrand(name, idBrand) {
    try {
        const cg = await brand.findByPk(idBrand)
        if(!cg) {
          return [{
              "message": `Can not find brand with id ${idBrand}`
            }, null]
        }
        const updateCG = await cg.set(name)
        await cg.save()
        return [null, updateCG]
      } catch (error) {
        return [error, null]
      }
}
async function deleteBrand(idBrand) {
    try {
        const cg = await brand.findByPk(idBrand)
        if(!cg) {
          return [{
              "message": `Can not find brand with id ${idBrand}`
            }, null]
        }
        const cgDelete = await cg.destroy({
          where: {
            id: idBrand
          }
        })
        return [null, cgDelete]
      } catch (error) {
        return [error, null]
      }
}
async function listAllBrand() {
    try {
        const cg = await brand.findAll()
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
async function listBrandById(idBrand) {
    try {
        const cg = await brand.findByPk(idBrand)
        if(!cg) {
          return [{
              "message": `Can not find brand with id ${idBrand}`
            }, null]
        }
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
module.exports = {
    addBrand,
    updateBrand,
    deleteBrand,
    listAllBrand,
    listBrandById,
    brand
}