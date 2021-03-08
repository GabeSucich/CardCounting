const PlayingStats = require("../controllers/statControllers/playingController")


module.exports = function(app) {

    app.get("/api/stats", (req, res) => {
        PlayingStats.getPlayerStats(req.user.id).then(dbStats => {
            res.json(dbStats)
        })
    })


}