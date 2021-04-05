var path = require('path')
var express = require('express')
var session = require("express-session");
var db = require("./models")
var passport = require('./config/passport')

var publicPath = path.join(__dirname, "client", "build")

var PORT = process.env.PORT || 5000;

app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(publicPath))

app.use(session({ secret: "True_count_is_4", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


require("./routes")(app)

app.get("*", function (req, res) {
    console.log("Sending backup")
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})


db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on localhost:" + PORT)
    })
})