import Card from "../Card"

const Helper = {

    createShoe(cardInfo, numDecks) {
        const shoe = []
        for (var i = 0; i < numDecks; i++) {
            for (const name of cardInfo.names) {
                for (const suit of cardInfo.suits) {
                    shoe.push(new Card(name, cardInfo.values[name], suit))
                }
            }
        }
        return this.shuffleShoe(shoe)
    },

    shuffleShoe(shoe) {
        const shuffled = [];
        while (shoe.length > 0) {
            shuffled.push(this.removeRandomElement(shoe));
        }
        return shuffled
    },

    removeRandomElement(arr) {
        var randomIndex = Math.floor(Math.random()*arr.length);
        return arr.splice(randomIndex, 1)
    }
}

export default Helper