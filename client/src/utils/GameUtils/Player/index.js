import PlayerHand from "../PlayerHand"

class Player {

    constructor(DecisionMaker) {
        this.DecisionMaker = DecisionMaker
        this.hands = [];
    }

    isDone() {
        for (const hand of this.hands) {
            if (!hand.isDone()) {
                return false;
            }
        }
        return true;
    }

    getHands() {
        return this.hands
    }

    hitHand(hand, card) {
        hand.addCard(card)
    }

    dealCard(card) {
        if (!this.hands[0]) {
            this.hands.push(new PlayerHand(card))
        } else {
            this.hands[0].addCard(card)
        } 
    }

    splitHand(hand) {
        const [card1, card2] = hand.cards
        var index = this.hands.indexOf(hand)
        var newHand1 = new PlayerHand(card1)
        newHand1.setSplit()
        var newHand2 = new PlayerHand(card2)
        newHand1.setSplit()
        this.hands.splice(index, 1, newHand1, newHand2)
    }

    makeProperDecision(hand, dealerHand, trueCount) {
        // console.log(dealerHand)
        return this.DecisionMaker.properMove(hand, this.hands.length, dealerHand, trueCount)
    }

    clearHand() {
        this.hands = []
    }

}

export default Player
