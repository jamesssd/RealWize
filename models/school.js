module.exports = function(sequelize, DataTypes) {
    // Add code here to create a Post model
    var Schools = sequelize.define("Schools", {
      rankings: {
        type: DataTypes.INTEGER,
        validate: {
          len: [1]
        }
      },

      distance: {
        type: DataTypes.INTEGER,
        validate: {
            len: [1]
          }
      }
      
    })
    // This model needs a title, a body, and a category
  
    // Don't forget to 'return' the post after defining
    return Schools
  };
  