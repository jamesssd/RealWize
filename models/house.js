module.exports = function(sequelize, DataTypes) {
    // Add code here to create a Post model
    var Housing = sequelize.define("Housing", {
    
      address: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        }
      },
      city: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        }
      },

      Year_built: {
        type: DataTypes.INTEGER,
        validate: {
          len: [1]
        }
      },
      lot_size: {
        type: DataTypes.DECIMAL,
        validate: {
          len: [1]
        }
      },
      propclass: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        }
      },
      date_listed: {
        type: DataTypes.DATEONLY,
        validate: {
          len: [1]
        }
      },
      rooms_amenities: {
        type: DataTypes.STRING,
        validate: {
          len: [1]
        }
      },
      
    })
    // This model needs a title, a body, and a category
  
    // Don't forget to 'return' the post after defining
    return Housing
  };
  