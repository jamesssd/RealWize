module.exports = function(sequelize, DataTypes) {
  // Add code here to create a Post model
  var Housing = sequelize.define("Housing", {
    
      
    // propertyIdDb: {
    //   type: DataTypes.BIGINT,
    //   validate: {
    //     len: [1]
    //   }
    // },
    addressDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    cityDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    priceDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },

    lotDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    propertyDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    propertySubtypeDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    yearBuiltDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    numberOfLevelsDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    bathsFullkeyDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    bathsHalfDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },


    bathDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    bedDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },

    roomsDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    heatDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    heatingTypeDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    garageDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    parkingSizeDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    school1keyDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    school1RatingkeyDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    school1DistanceDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    school2keyDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    school2RatingkeyDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    school2DistanceDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    school3keyDb: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    school3RatingkeyDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    school3DistanceDb: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1]
      }
    },
    listedDateDB: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    }

  });
    // This model needs a title, a body, and a category
  
  // Don't forget to 'return' the post after defining

  Housing.associate = function(models) {
    // Associating Houses with Posts
    // When an Houses is deleted, also delete any associated Posts
    Housing.hasMany(models.Favorites);
  };
  return Housing;
};
  