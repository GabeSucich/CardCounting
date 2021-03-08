const Game = require("../controllers/gameController")

const PlayingStats = require("../controllers/statControllers/playingController")

const StatHelper = require("../utils/StatHelper")

module.exports = function(app) {

    app.post("/api/game/save", (req, res) => {

        const userId = req.user.id

        const {numDecks, numPlayers, rules, stats, playingDeviations} = req.body

        var playingStats = stats.filter(stat => stat.type === "playing")
        var runningCountStats = stats.filter(stat => stat.type === "runningCount")

        var data = {}

        data.numDecks = numDecks;
        data.numPlayers = numPlayers;
        data.playingDeviations = playingDeviations;
        data = {...data, ...rules};

        data.decisionAccuracy = StatHelper.calculateDecisionAccuracy(playingStats);
        playingStats = playingStats.filter(stat => stat.correctDecision !== stat.playerDecision)

        data.runningCountAccuracy = StatHelper.calculateRunningCountAccuracy(runningCountStats);
        data.averageCountError = StatHelper.calculateAverageCountError(runningCountStats);
        data.averageAbsoluteCountError = StatHelper.calculateAbsoluteCountError(runningCountStats);


        Game.createGame(userId, data).then(dbGame => {
           
            var gameId = dbGame.id
            PlayingStats.createStats(userId, gameId, playingStats).then(dbPlayingStats => {
            
                res.json({game: dbGame, playingStats: dbPlayingStats})
                
            })
        })
    })

    app.get("/api/game/stats", (req, res) =>{
        Game.getAllGames(req.user.id).then(dbGames => {
            PlayingStats.getPlayerStats(req.user.id).then(dbStats => {
                
                var dbInfo = dbGames.map(game => {
                    return {
                        game: game,
                        playingStats: dbStats.filter(stat=> stat.GameId === game.id)
                    }
                })
                res.json(dbInfo)
            })
        })
    })
}
