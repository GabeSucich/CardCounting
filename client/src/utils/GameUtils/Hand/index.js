
class Hand {

    sumCards(cards) {
        var total = 0;
        for (const card of cards) {
            total += eval(card.value);
        }
        return String(total)
    }

    cardCount() {
        return this.cards.length
    }

    isDone() {
        return this.done
    }

    isBust() {
        return this.bust
    }

    setBust() {
        this.bust = true
    }

    setDone() {
        this.done = true
    }

    handleAces() {
        const aces = []
        const nonAces = []

        for (const card of this.cards) {
            if (card.isAce()) {
                aces.push(card)
            } else {
                nonAces.push(card)
            }
        }

        const nonAceSum = this.sumCards(nonAces)

        for (var i = 0; i < aces.length; i++) {
            var card = aces[i]
            if (eval(nonAceSum) <= 11 - aces.length && i === 0) {
                card.value = "11"
            } else {
                card.value = "1"
            }
        }
    }

    getHandValue() {
        return this.sumCards(this.cards)
    }

    addCard(card) {
        this.cards.push(card);
        this.handleAces()
    }
}

export default Hand


