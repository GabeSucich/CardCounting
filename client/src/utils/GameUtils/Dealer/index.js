import DealerHand from "../DealerHand"

class Dealer {

    constructor(h17) {
        this.hand = null;
        this.h17 = h17 // If true, must hit on soft 17, otherwise stand on soft s17
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
        } else if (this.hand.isSoft17()) {
            if (this.h17) {
                return "H"
            } else {
                return "S"
            }
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

export default Dealer