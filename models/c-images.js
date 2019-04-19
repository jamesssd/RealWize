module.exports = function(sequelize, Sequelize) {
    let pictures = sequelize.define("Images", {

        Id: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },

        urlName: {
            type: Sequelize.STRING
        }
    });
    pictures.associate = function(models) {
        pictures.hasMany(models.Housing)
    };
    return pictures;
}