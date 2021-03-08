import Hand from "../Hand"
import Card from "../Card"

class DealerHand extends Hand  {
    constructor(downCard) {
        super()
        this.downCard = downCard;
        this.cards = [downCard]
        this.done = false;
    }

    dealUpcard(upCard) {
        this.upCard = upCard
        this.cards.push(this.upCard)
    }

    getUpcard() {
        return this.upCard.value
    }

    getDowncard() {
        return this.downCard
    }

    flipCards() {
        this.downCard.flipUp()
        this.handleAces()
    }

    isSoft17() {
        var total = this.getHandValue()
        if (eval(total) !== 17) {
            return false
        }
    
        for (const card of this.cards) {
            if (card.value === "11") {
                return true
            }
        
        return false
        }
    }
    
}

export default DealerHand

