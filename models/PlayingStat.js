module.exports = function(sequelize, DataTypes) {

    var PlayingStat = sequelize.define("PlayingStat", {

        trueCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        dealerUpcard: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        playerCards: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        playerDecision: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        correctDecision: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    PlayingStat.associate = function(models){
        PlayingStat.belongsTo(models.User, {foreignKey: {allowNull: false}})
        PlayingStat.belongsTo(models.Game, {foreignKey: {allowNull: false}})
    }
    
    return PlayingStat

}