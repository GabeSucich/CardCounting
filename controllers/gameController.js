const db = require("../models")

const Game = {

    createGame(userId, data) {
        return db.Game.create({UserId: userId, ...data}).then(dbGame => {
            return dbGame
        })
    },

    getAllGames(userId) {
        return db.Game.findAll({where : {UserId: userId}}).then(dbGames => {
            return dbGames
        })
    }

}

module.exports = Game