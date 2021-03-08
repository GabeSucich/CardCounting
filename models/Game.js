module.exports = function(sequelize, DataTypes) {

    var Game = sequelize.define("Game", {

        numDecks: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        numPlayers: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        playingDeviations: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        canDAS: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        canSurrender: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        h17: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        decisionAccuracy: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: false
        },

        runningCountAccuracy: {
            type: DataTypes.DECIMAL(10, 4),
            allowNull: true
        },

        averageCountError: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: true
        },

        averageAbsoluteCountError: {
            type: DataTypes.DECIMAL(10, 3),
            allowNull: true
        }

    })

    Game.associate = function(models) {
        Game.belongsTo(models.User, {foreignKey: {allowNull: false}})
        Game.hasMany(models.PlayingStat, {onDelete: "cascade"})
    }

    return Game

}