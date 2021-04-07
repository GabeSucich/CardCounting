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

    checkPassword(username, passwordEntry) {
        return Axios({
            method: "POST",
            data: {username: username, password: passwordEntry},
            url: "/api/user/checkpassword"
        }).then(response => {
            return response.data
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
    },

    logout() {
        return Axios({
            method: "GET",
            url: "/api/user/logout"
        }).then(response => {
            return response
        })
    }

}

export default UserAPI