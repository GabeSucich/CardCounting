
const db = require("../../models")


const RunningCountStat =  {

    createStats(userId, gameId, stats) {

        stats = stats.map(stat => {
            return {...stat, GameId: gameId, UserId: userId}
        })
        return db.RunningCountStat.bulkCreate(stats)
    },

    getPlayerStats(userId) {
        return db.RunningCountStat.findAll({where: {UserId: userId}})
    }

}

module.exports = RunningCountStat