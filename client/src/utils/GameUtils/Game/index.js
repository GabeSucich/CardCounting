import Shoe from "../Shoe"
import DealerHand from "../DealerHand"
import PlayerHand from "../PlayerHand"
import Player from "../Player"
import Dealer from "../Dealer"
import DecisionMaker from "../DecisionMaker"

const _ = require("lodash")


const defaultRules = {
    canSurrender: false,
    canDAS: true
}

class TrainingGame {

    // The activePlayerTrigger function takes in two arguments 

    constructor(numPlayers, numDecks, ruleOptions = defaultRules, considerIndices = false) {
        this.numPlayers = numPlayers;
        this.numDecks = numDecks
        this.canSurrender = ruleOptions.canSurrender;
        this.canDAS = ruleOptions.canDAS;
        this.h17 = ruleOptions.h17;
        this.considerIndices = considerIndices

        this.shoe = new Shoe(this.numDecks)
        this.playerDecisionMaker = new DecisionMaker(this.canSurrender, this.canDAS, this.h17, this.considerIndices)

        this.activePlayerIndex = this.randomActiveIndex()
        // this.activePlayerIndex = 5 // Can comment out for testing

        this.gameHistory = []

        this.players = this.createPlayerOrder()
        this.dealer = new Dealer(this.h17)

        this.playGame()


    }

    // Returns general information about the game

    createNewGame() {
        return new TrainingGame(this.numPlayers, this.numDecks, { canSurrender: this.canSurrender, canDAS: this.canDAS }, this.considerIndices)
    }

    seePlayerHands() {
        console.log("Player Hands:")
        console.log(this.players.map(playerObj => playerObj.player.getHands().map(hand => hand.cards)))
    }

    seeDealerHand() {
        console.log("Dealer Hand:")
        console.log(this.dealer.hand.cards)
    }

    getActivePlayerIndex() {
        return this.activePlayerIndex
    }

    getPlayers() {
        return this.players
    }

    getDealer() {
        return this.dealer;
    }

    // Functions which give information on the shoe
    getTrueCount() {
        return this.shoe.getTrueCount()
    }

    getRunningCount() {
        return this.shoe.getRunningCount()
    }

    getDecksRemainings() {
        return this.shoe.estimateRemainingDecks()
    }

    getTotalDecks() {
        return this.numDecks
    }

    nextCard(isUpcard) {

        const card = this.shoe.dealCard(isUpcard)
        return card
    }

    getCardsRemining() {
        return this.shoe.numCardsRemaining()
    }

    consideringIndices() {
        return this.considerIndices
    }

    // Creates a random order of players to deal to

    randomActiveIndex() {
        return Math.floor(Math.random() * this.numPlayers)
    }


    createPlayerOrder() {
        const players = []

        for (var i = 0; i < this.numPlayers; i++) {
            players.push({ id: i, player: new Player(this.playerDecisionMaker) })
        }
        return players
    }

    // Functions which handle the dealing of cards at the beginning of each round

    playGame() {
        while (this.getCardsRemining() > (this.numPlayers + 1) * 5) {
            this.playRound()
        }
    }

    playRound() {
        this.dealStartingCards()
        for (const { player, id } of this.players) {
            this.attendToPlayer(player, id)
        }
        this.attendToDealer()
        this.clearAllHands()
    }

    updateHistory(action, playerId) {
        const history = { action: action, playerId: playerId }
        history["dealerHand"] = _.cloneDeep(this.dealer.getHand())
        history["trueCount"] = this.getTrueCount()
        history["decksRemaining"] = this.getDecksRemainings()
        history["runningCount"] = this.getRunningCount()

        for (const { player, id } of this.players) {
            history[id] = _.cloneDeep(player.getHands());
        }
        this.gameHistory.push(history)
    }

    getHistory() {
        return this.gameHistory
    }

    printHistory() {
        this.gameHistory.map(event => {
            console.log(event)
            event["0"].map(hand => console.log(hand.cards))
            event["1"].map(hand => console.log(hand.cards))
            event["2"].map(hand => console.log(hand.cards))
            console.log("------------------------------------------")
        })
    }

    dealStartingCards() {
        for (const { player, id } of this.players) {
            this.dealToPlayer(player, id)
        }
        this.dealToDealer(false)
        for (const { player, id } of this.players) {
            this.dealToPlayer(player, id)
        }
        this.dealToDealer()
    }

    dealToPlayer(player, id) {
        player.dealCard(this.nextCard())
        this.updateHistory("deal", id)
    }

    hitPlayer(player, hand, id) {
        player.hitHand(hand, this.nextCard())
        this.updateHistory("hit", id)
    }

    playerBust(hand, id) {
        hand.setBust()
        hand.setDone()
        this.updateHistory("bust", id)
    }
    playerStay(hand, id) {
        hand.setDone()
        this.updateHistory("stay", id)
    }

    doubleDownPlayer(player, hand, id) {
        player.hitHand(hand, this.nextCard())
        hand.setDone()
        this.updateHistory("double", id)
    }

    surrenderPlayer(hand, id) {
        hand.setDone()
        this.updateHistory("surrender", id)

    }

    handlePlayerBlackjack(hand, id) {
        hand.setDone()
        this.updateHistory("blackjack", id)
    }

    handlePlayerInsurance(hand, id) {
        hand.setDone()
        hand.evaluateInsurance()
        this.updateHistory("insurance", id)
    }

    handlePlayerBlackjackInsurance(takingInsurance, hand, id) {
        hand.setDone()
        hand.evaluateInsurance()
        if (takingInsurance) {
          this.updateHistory("blackjack-insurance", id)  
        } else {
            this.updateHistory("blackjack-no-insurance", id)  
        }
        
    }

    hitDealer() {
        this.dealer.hit(this.nextCard())
        this.updateHistory("hit", "d")
    }

    stayDealer() {
        this.dealer.stay()
        this.updateHistory("stay", "d")
    }

    dealToDealer(isUpcard = true) {
        this.dealer.dealCard(this.nextCard(isUpcard))
        this.updateHistory("deal", "d")
    }

    allPlayersBust() {
        this.dealer.setDone()
        this.updateHistory("stay", "d")
    }

    flipDealerCards() {
        this.dealer.flipCards()
        this.shoe.updateFlippedCard(this.dealer.hand.getDowncard())
        this.updateHistory("flip", "d")
    }

    splitPlayerHand(player, hand, id) {
        player.splitHand(hand)
        this.updateHistory("split", id)
        this.attendToPlayer(player, id)
    }

    clearHand(player, id) {
        player.clearHand()
        this.updateHistory("clear", id)
    }

    clearDealerHand() {
        this.dealer.clearHand()
        this.updateHistory("clear", "d")
    }

    clearAllHands() {

        this.clearDealerHand()
        for (const { player, id } of this.players) {
            this.clearHand(player, id)
        }

    }


    // Functions which handle with playing rounds
    attendToPlayer(player, id) {

        var playerAndHandToSplit = null

        for (const hand of player.getHands()) {

            if (hand.isDone()) {
                continue;
            }
            var finished = false

            while (!finished) {

                const decision = player.makeProperDecision(hand, this.dealer.getHand(), this.getTrueCount())
                
                if (hand.isBlackjack()) {
                    if (decision === "INS") {
                        this.handlePlayerBlackjackInsurance(true, hand, id)
                    } else if (this.dealer.getHand().getUpcard() === "A") {
                        this.handlePlayerBlackjackInsurance(false, hand, id)
                    }
                    else {
                        this.handlePlayerBlackjack(hand, id)
                    }
                    finished = true
                } else if (decision === "INS") {
                    this.handlePlayerInsurance(hand, id)
                } else if (decision === "SURR") {
                    this.surrenderPlayer(hand, id);
                    finished = true;
                } else if (decision === "S") {
                    this.playerStay(hand, id)
                    finished = true;
                } else if (decision === "bust") {
                    this.playerBust(hand, id)
                    finished = true;
                } else if (decision === "H") {
                    this.hitPlayer(player, hand, id)
                } else if (decision === "D") {
                    this.doubleDownPlayer(player, hand, id)
                    finished = true;
                } else if (decision === "SP") {
                    playerAndHandToSplit = [player, hand, id]
                    finished = true;
                }
            }
        }
        if (playerAndHandToSplit) {
            this.splitPlayerHand(...playerAndHandToSplit)
        }
    }


    attendToDealer() {
        this.flipDealerCards()

        var dealerMustPlay = false

        for (const hand of this.getAllPlayerHands()) {
            if (!(hand.isBust() || hand.isBlackjack())) {
                dealerMustPlay = true;
            }
        }

        if (!dealerMustPlay) {
            this.allPlayersBust()
            return
        }

        var finished = false;
        while (!finished) {
            var nextAction = this.dealer.nextAction()
            if (nextAction === "H") {
                this.hitDealer()
            } else if (nextAction === "S") {
                finished = true;
            } else {
                throw new Error("The dealer action was something other than H or S")
            }
        }
    }

    getAllPlayerHands() {
        const allHands = []
        for (const { player } of this.players) {
            for (const hand of player.getHands()) {
                allHands.push(hand)
            }
        }
        return allHands
    }



}

export default TrainingGame
