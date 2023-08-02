const { User } = require("./user")
const {Course}=require("./course")

module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define("subscription", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    });
  
  
    return Subscription;
  };