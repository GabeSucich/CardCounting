const DealerHand = require("../DealerHand")

class Dealer {

    constructor() {
        this.hand = null;
    }

    getHand() {
        return this.hand;
    }

    setDone() {
        this.hand.setDone()
    }

    dealCard(card) {
        if (!this.hand) {
            card.flipDown()
            this.hand = new DealerHand(card)
        } else {
            this.hand.dealUpcard(card)
        }
    }
    
    nextAction() {
        if (eval(this.hand.getHandValue()) >= 17 && !this.hand.isSoft17()) {
            return "S"
        }
        return "H"
    }

    hit(card) {
        this.hand.addCard(card)
    }

    stay() {
        this.hand.setDone()
    }

    flipCards() {
        this.hand.flipCards()
    }

    clearHand() {
        this.hand = null;
    }

}

module.exports = Dealer