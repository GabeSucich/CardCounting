const Hand = require("../Hand")
const Card = require("../Card")

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

module.exports = DealerHand

// const a = new Card("A", "A", "")
// const b = new Card("7", "7", "")
// const c = new Card("2", "2", "")
// const d = new Card("J", "10", "")
// const e = new Card("9", "9", "")
// const f = new Card("6", "6", "")
// const g = new Card("5", "5", "")
// const h = new Card("3", "3", "")
// const i = new Card("4", "4", "")
// const j = new Card("A", "A", "")

// const dh = new DealerHand(a)
// dh.dealUpcard(j)
// dh.addCard(h)
// dh.addCard(c)
// dh.addCard(b)
// dh.flipCards()
// console.log(dh.cards)
// console.log(dh.isSoft17())
