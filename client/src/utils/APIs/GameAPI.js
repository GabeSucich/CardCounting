import Axios from "axios"

const GameAPI = {

    saveGame(numDecks, numPlayers, stats, rules, playingDeviations) {
        return Axios({
            method: "POST",
            url: "/api/game/save",
            data: { numDecks: numDecks, numPlayers: numPlayers, rules: rules, stats: stats, playingDeviations: playingDeviations }
        }).then(response => {
            return response.data
        })
    },

    getAllGameStats() {
        return Axios({
            method: "GET",
            url: "/api/game/stats"
        }).then(response => {
            return response.data
        })
    }

}

export default GameAPI


