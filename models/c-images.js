module.exports = function(sequelize, Sequelize) {
    let pictures = sequelize.define("Images", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: true
        },
        urlName: {
            type: Sequelize.STRING
        },
        
    });

    pictures.associate = function(models) {
        pictures.belongsTo(models.Housing)
    };
    return pictures;
}