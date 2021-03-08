const db = require("../../models")

const PlayingStat =  {

    createStats(userId, gameId, stats) {

        stats = stats.map(stat => {
            return {...stat, GameId: gameId, UserId: userId}
        })
        return db.PlayingStat.bulkCreate(stats)
    },

    getPlayerStats(userId) {
        return db.PlayingStat.findAll({where: {UserId: userId}})
    }



}

module.exports = PlayingStat