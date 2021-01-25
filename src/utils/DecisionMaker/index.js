const hardTotals = require("../strategyJSON/hardTotals.json")
const softTotals = require("../strategyJSON/softTotals.json")
const splits = require("../strategyJSON/splits.json")
const surrenders = require("../strategyJSON/surrender.json")
const key = require("../strategyJSON/key.json")

const Card = require("../Card")
const PlayerHand = require("../PlayerHand")
const DealerHand = require("../DealerHand")
const Shoe = require("../Shoe")

class DecisionMaker {

    constructor(canSurrender, canDAS, considerIndices) {

        this.canSurrender = canSurrender;
        this.canDAS = canDAS;
        this.considerIndices = considerIndices;

    }

    properMove(playerHand, playerHandCount, dealerHand, trueCount) {
        if (this.canSurrender) {
            return this.evaluateSurrender(playerHand, playerHandCount, dealerHand)
        } else {
            return this.evaluateBasicStrategy(playerHand, playerHandCount, dealerHand)
        }
    }

    evaluateBasicStrategy(playerHand, playerHandCount, dealerHand) {

        var playerRepresentation = playerHand.handRepresentation()
        var dealerUpcard = dealerHand.getUpcard()
    
        if (playerHand.cards.length === 1) {
            return "H"
        }
        if (playerRepresentation === "bust") {
            return "bust"
        }
        if (playerRepresentation in hardTotals) {
            var decision = hardTotals[playerRepresentation][dealerUpcard]
            if (decision === "D") {
                if (playerHand.cardCount() === 2) {
                    return "D"
                }
                return "H"
            }
            return decision
        } else if (playerRepresentation in softTotals) {
            var decision = softTotals[playerRepresentation][dealerUpcard]
            if (decision === "D") {
                if (playerHand.cardCount() === 2) {
                    return "D"
                }
                return "H"
            } else if (decision === "DS") {
                if (playerHand.cardCount() === 2) {
                    return "D"
                }
                return "S"
            }
            return decision
        } else if (playerHand.canBeSplit()) {
            var decision = splits[playerRepresentation][dealerUpcard] 
            if (decision === "DSP" || (decision === "DAS" && !this.canDAS)) {
                var adjustedRepresntation = playerHand.adjustRepresentationForDAS()
                return hardTotals[adjustedRepresntation][dealerUpcard]
            } else if (decision === "DAS") {
                return "D"
            } else if (decision === "SP" && playerHandCount === 3) {
                var adjustedRepresntation = playerHand.adjustRepresentationForDAS()
                if (adjustedRepresntation in hardTotals) {
                    return hardTotals[adjustedRepresntation][dealerUpcard]
                } else if (adjustedRepresntation in softTotals) {
                    return softTotals[adjustedRepresntation][dealerUpcard]
                }
                
            } else {
                return decision
            }
        } else {
            throw new Error(`There is no basic strategy associated with the representation ${this.playerRepresentation}`)
        }
    }

    evaluateSurrender(playerHand, playerHandCount, dealerHand) {

        var playerRepresentation = playerHand.handRepresentation()
        var dealerUpcard = dealerHand.getUpcard()

        if (playerRepresentation in surrenders) {
            if (surrenders[playerRepresentation].includes(dealerUpcard)) {
                return "SURR"
            }
        }
        return this.evaluateBasicStrategy(playerHand, playerHandCount, dealerHand)
    }
    
}

module.exports = DecisionMaker


