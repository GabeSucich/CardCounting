import Axios from "axios"

const StatAPI = {

    getAllStats() {
        return Axios({
            method: "GET",
            url: "/api/stats"
        }).then(response => {
            return response.data
        })
    }

}

export default StatAPI