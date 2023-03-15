const Sequelize = require('sequelize')
const databaseServer = require('../integration/sql').getDatabaseInstance()
/*
  Thông tin phân loại cho sản phẩm.  
  Lien ket voi bang Product: 1 - 1,
*/
const category = databaseServer.define('category', {
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
async function addCategory(name) {
    try {
        const cg = await category.create({ name })
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
async function updateCategory(name, idCategory) {
    try {
        const cg = await category.findByPk(idCategory)
        if(!cg) {
          return [{
              "message": `Can not find category with id ${idCategory}`
            }, null]
        }
        const updateCG = await cg.set(name)
        await cg.save()
        return [null, updateCG]
      } catch (error) {
        return [error, null]
      }
}
async function deleteCategory(idCategory) {
    try {
        const cg = await category.findByPk(idCategory)
        if(!cg) {
          return [{
              "message": `Can not find category with id ${idCategory}`
            }, null]
        }
        const cgDelete = await cg.destroy({
          where: {
            id: idCategory
          }
        })
        return [null, cgDelete]
      } catch (error) {
        return [error, null]
      }
}
async function listAllCategory() {
    try {
        const cg = await category.findAll()
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
async function listCategoryById(idCategory) {
    try {
        const cg = await category.findByPk(idCategory)
        if(!cg) {
          return [{
              "message": `Can not find category with id ${idCategory}`
            }, null]
        }
        return [null, cg]
    } catch (error) {
        return [error, null]
    }
}
// category.hasOne(product, {
//   foreignKey: {
//     name: "idCategory",
//     allowNull: false
//   }
// })

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    listAllCategory,
    listCategoryById,
    category
}