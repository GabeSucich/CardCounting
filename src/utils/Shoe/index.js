
const cardInfo = require("../../cards/cards.json")
const Helper = require("./Helpers")

class Shoe {

    constructor(numDecks) {
        this.totalDecks = numDecks;
        this.undealtCards = Helper.createShoe(cardInfo, numDecks);
        this.dealtCards = [];
        this.runningCount = 0;
    }



    numCardsRemaining() {
        return this.undealtCards.length
    }

    numCardsDealt() {
        return this.dealtCards.length
    }

    totalCards() {
        return this.numCardsDealt() + this.numCardsRemaining()
    }

    dealCard() {
        var nextCard = this.undealtCards.pop()[0];
        if (nextCard.isAce() || nextCard.value === "10") {
            this.runningCount = this.runningCount - 1
        } else if (eval(nextCard.value) < 7) {
            this.runningCount = this.runningCount + 1
        }
        this.dealtCards.push(nextCard)
        return nextCard;
    }


    getRunningCount() {
        return this.runningCount
    }

    getTrueCount() {
        return Math.ceil(this.runningCount/this.estimateRemainingDecks())
    }

    estimateRemainingDecks() {

        return Math.ceil( (this.numCardsRemaining()/this.totalCards())*2*this.totalDecks )/2
    }






}


module.exports = Shoe


