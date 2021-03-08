module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    User.associate = function(models) {
        User.hasMany(models.Game, {onDelete: "cascade"})
        User.hasMany(models.PlayingStat, {onDelete: "cascade"})
    }

    return User
}