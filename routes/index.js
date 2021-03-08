var userRoutes = require("./userRoutes")
var gameRoutes = require("./gameRoutes")
var statRoutes = require("./statRoutes")

module.exports = function(app) {

    userRoutes(app)
    gameRoutes(app)
    statRoutes(app)

}