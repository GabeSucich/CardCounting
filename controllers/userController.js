const db = require("../models")
const bcrypt = require("bcryptjs")

const User = {

    findUser(username) {
        return db.User.findOne({ where: { username: username } })
    },

    createUser(username, password) {
        return db.User.create({ username: username, password: password })
    },

    verifyUser(username, password) {

        return db.User.findOne({where: {username: username}}).then(({hashedPassword}) => {
            if (bcrypt.compareSync(password, hashedPassword)) {
                return true;
            } else {
                return false;
            }
        })

        
    }

}

module.exports = User