"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User)
      Transaction.belongsTo(models.PropertyItem)
      Transaction.belongsTo(models.Property)
      Transaction.hasOne(models.Review)
    }
  }
  Transaction.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      price: DataTypes.STRING,
      total_price: DataTypes.STRING,
      payment_proof: DataTypes.STRING,
      status: DataTypes.STRING,
      exp_date: DataTypes.DATE,
      is_checked: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  )
  return Transaction
}
