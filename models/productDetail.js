const Sequelize = require('sequelize')
const databaseServer = require('../integration/sql')
/*
  Thông tin chi tiết sản phẩm cho từng sản phẩm trong giỏ hàng. 
  Lien ket voi bang ProductOption: 1 - 1,
*/
const productDetail = databaseServer.getDatabaseInstance().define('productDetail', {
    /*
      Id tự tăng
    */
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    /*
      id sản phẩm chung
    */
    idProductOption: {
      allowNull: false,
      type: Sequelize.INTEGER
    }, 
    idOrder: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    price: {
      allowNull: false,
      type: Sequelize.FLOAT
    },
    subtotal: {
      allowNull: false,
      type: Sequelize.FLOAT
    },
    quantity: {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: 1
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
async function addProductDetail(productInfo) {
  try {
    const pd = await productDetail.bulkCreate(productInfo)
    return [null, pd]
  } catch (error) {
    return [error, null]
  }
}
module.exports = {
  productDetail,
  addProductDetail
}