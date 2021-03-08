import Card from "../../utils/GameUtils/Card"
import PlayerHand from "../../utils/GameUtils/PlayerHand"

const Helper = {

    assemblePlays(playingStats) {
        console.log(playingStats)
        const assembledPlays = [];
        for (const stat of playingStats) {
            var playerCards = stat.playerCards.split(",").map(cardRep => this.cardFromRep(cardRep))
            var playerHand = new PlayerHand(...playerCards)
            var dealerUpcard = this.cardFromRep(stat.dealerUpcard)
            var dealerDowncard = new Card("9", "9", "H")
            dealerDowncard.flipDown()
            var dealerHand = new PlayerHand(dealerDowncard, dealerUpcard)
            var correctDecision= this.formatDecision(stat.correctDecision);
            var playerDecision = this.formatDecision(stat.playerDecision)
            assembledPlays.push({playerHand: playerHand, dealerHand: dealerHand, trueCount: stat.trueCount, correctDecision: correctDecision, playerDecision: playerDecision})
        }

        return assembledPlays
    },

    cardFromRep(cardRep) {
        if (cardRep.length === 2) {
            return new Card(cardRep[0], "", cardRep[1])
        } else if (cardRep.length === 3) {
            return new Card(cardRep[0] + cardRep[1], "", cardRep[2])
        } else {
            throw new Error("Cannot handle card representation: " + cardRep)
        }
    },

    formatDecision(decision) {
        switch (decision) {
            case "hit":
                return "Hit";
            case "stay":
                return "Stay";
            case "blackjack-insurance":
                return "Insurance";
            case "blackjack-no-insurance":
                return "No Insurance";
            case "insurance":
                return "Insurance"
            case "double":
                return "Double Down";
            case "surrender":
                return "Surrender"
            default:
                throw new Error("Cannot handle following action: " + decision)
        }
    }

}

export default Helper