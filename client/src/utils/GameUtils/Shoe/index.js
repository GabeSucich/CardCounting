import Helper from "./Helpers"
import cardInfo from "../../cards/cards.json"


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

    dealCard(isUpcard = true) {
        var nextCard = this.undealtCards.pop()[0];
        if (isUpcard) {
            if (nextCard.isAce() || nextCard.value === "10") {
                this.runningCount = this.runningCount - 1
            } else if (eval(nextCard.value) < 7) {
                this.runningCount = this.runningCount + 1
            }
        }
        this.dealtCards.push(nextCard)
        return nextCard;
    }

    updateFlippedCard(card) {
        if (card.isAce() || card.value === "10") {
            this.runningCount = this.runningCount - 1
        } else if (eval(card.value) < 7) {
            this.runningCount = this.runningCount + 1
        }
    }


    getRunningCount() {
        return this.runningCount
    }

    getTrueCount() {
        return Math.round(this.runningCount / this.estimateRemainingDecks())
    }

    estimateRemainingDecks() {

        return Math.ceil((this.numCardsRemaining() / this.totalCards()) * 2 * this.totalDecks) / 2
    }

}


export default Shoe


