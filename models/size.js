const Sequelize = require('sequelize')
const databaseServer = require('../integration/sql')
/*
  Thông tin size cho sản phẩm.  
  Lien ket voi bang Product: 1 - 1,
*/
const size = databaseServer.getDatabaseInstance().define('size', {
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
async function addSize(name) {
    try {
        const cg = await size.create({ name })
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
async function updateSize(name, idSize) {
    try {
        const cg = await size.findByPk(idSize)
        if(!cg) {
          return [{
              "message": `Can not find size with id ${idSize}`
            }, null]
        }
        const updateCG = await cg.set(name)
        await cg.save()
        return [null, updateCG]
      } catch (error) {
        return [error, null]
      }
}
async function deleteSize(idSize) {
    try {
        const cg = await size.findByPk(idSize)
        if(!cg) {
          return [{
              "message": `Can not find size with id ${idSize}`
            }, null]
        }
        const cgDelete = await cg.destroy({
          where: {
            id: idSize
          }
        })
        return [null, cgDelete]
      } catch (error) {
        return [error, null]
      }
}
async function listAllSize() {
    try {
        const cg = await size.findAll()
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
async function listSizeById(idSize) {
    try {
        const cg = await size.findByPk(idSize)
        if(!cg) {
          return [{
              "message": `Can not find size with id ${idSize}`
            }, null]
        }
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
module.exports = {
    addSize,
    updateSize,
    deleteSize,
    listAllSize,
    listSizeById,
    size
}