import bcrypt from "bcryptjs"
import Axios from "axios"

const UserAPI = {

    checkCurrenUser() {
        return Axios({
            method: "GET",
            url: "/api/user/current"
        }).then(response => {
            return response.data
        })
    }, 

    findUsername(username) {
        return Axios({
            method: "POST",
            data: {username: username},
            url: "/api/user/getuser"
        }).then(response => {
            return response.data
        })
    },

    checkPassword(passwordEntry, encryptedPassword) {
        return bcrypt.compareSync(passwordEntry, encryptedPassword)
    },

    checkPasswordFromDatabase(username, password) {
        this.findUsername(username).then(dbUser => {
            return bcrypt.compareSync(password, dbUser.password)
        })
    },

    signup(username, password) {
        password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        return Axios({
            method: "POST",
            data: {username: username, password: password},
            url: "/api/user/create"
        }).then(response => {
            return response.data
        })
    },

    loginUser(user) {
        return Axios({
            method: "POST",
            url: "/api/user/login",
            data: {username: user.username, password: "unnecessary"}
        }).then(response => {
            return response.data
        })
    }

}

export default UserAPI