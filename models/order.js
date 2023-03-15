const Sequelize = require('sequelize')
const databaseServer = require('../integration/sql').getDatabaseInstance()
/*
  Thông tin giỏ hàng cho từng đơn hàng. 
  Lien ket voi bang ProductDetail: 1 - N,
*/
const order = databaseServer.define('order', {
    /*
      Id tự tăng
    */
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    totalPrice: {
      allowNull: false,
      type: Sequelize.FLOAT,
    },
    fullName: {
      allowNull: false,
      type: Sequelize.TEXT,
  },
    emailCustomer: {
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
async function addOrder(orderInfo) {
  try {
    const od = await order.create(orderInfo);
    return [null, od]
  } catch (error) {
    return [error, null]
  }
}

module.exports = {
  order,
  addOrder
}