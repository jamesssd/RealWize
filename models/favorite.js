module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites");

  Favorites.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Favorites.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });

    Favorites.belongsTo(models.Housing, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorites;
};