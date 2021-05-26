'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Author); // Will add a AthorId attribute to Publication to hold the primary key value for Author
    }
  };
  Publication.init({
    date: DataTypes.DATEONLY,
    title: DataTypes.STRING,
    body: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publication',
  });
  return Publication;
};