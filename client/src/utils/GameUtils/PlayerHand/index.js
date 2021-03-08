import Card from "../Card"
import Hand from "../Hand"

class PlayerHand extends Hand {

    constructor(...cards) {
        super()
        this.aceInHand = false;
        this.cards = [...cards]
        this.handleAces()
        this.done = false;
        this.split = false;
        this.evaluatedInsurance = false;
    }

    isDone() {
        return this.done;
    }

    setDone() {
        this.done = true;
    }

    isSplit() {
        return this.split
    }

    setSplit() {
        this.split = true
    }

    evaluateInsurance() {
        this.evaluatedInsurance = true
    }

    hasEvaluatedInsurance() {
        return this.evaluatedInsurance
    }

    seeHand() {
        return this.cards.map(card => card.name + card.suit)
    }

    isBlackjack() {
        return this.cards.length === 2 && this.handRepresentation() === "A10"
    }

    canDoubleDown() {
        return this.cards.length === 2;
    }

    canBeSplit() {
        return this.cards.length === 2 && this.cards[0].name === this.cards[1].name
    }

    hasHighAce() {

        for (const card of this.cards) {
            if (card.value == "11") {
                return true;
            }
        }
        return false
    }


    handRepresentation() {

        var handTotal = this.getHandValue();

        if (eval(handTotal) > 21) {
            return "bust"
        }

        if (this.cards.length === 1) {
            return this.cards[0].value
        }

        if (this.canBeSplit()) {
            if (this.cards[0].isAce()) {
                return "AA"
            } else {
                return this.cards[0].value + this.cards[1].value
            }

        } else if (this.hasHighAce()) {
            var total = 0
            for (const card of this.cards) {
                if (card.value !== "11") {
                    total += eval(card.value)
                }
            }
            return "A" + String(total)
        } else {
            return this.getHandValue()
        }
    }

    adjustRepresentationForDAS() {
        if (!this.canBeSplit()) {
            throw new Error("Trying to adjust for DAS when hand is not splittable")
        } else {
            var currentRepresentation = this.handRepresentation();
            if (currentRepresentation === "AA") {
                return "12"
            }
            else {
                return this.getHandValue()
            }
        }
    }

}

export default PlayerHand



