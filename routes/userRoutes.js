const User = require("../controllers/userController")
const passport = require("../config/passport")
const _ = require("lodash")

module.exports = function(app) {

    app.get("/api/user/current", (req, res) => {
        res.json(req.user)
    })

    app.post("/api/user/login", passport.authenticate("local"), (req, res) => {
        res.json(req.user)
    })

    app.post("/api/user/create", (req, res) => {
        const {username, password} = req.body
        User.createUser(username, password).then(newUser => {
            delete newUser.password
            res.json(newUser)
        })
    })

    app.post("/api/user/getuser", (req, res) => {
        const {username} = req.body
        User.findUser(username).then(dbUser => {
            if (_.isEmpty(dbUser)) {
                res.json(null)
            } else {
                res.json(dbUser)
            }
        })
    })
}