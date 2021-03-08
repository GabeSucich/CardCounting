
import React, {useEffect, useState} from "react"

import {Segment, Button, Header} from "semantic-ui-react"

import {useQuestionContext} from "../../../GlobalStates/QuestionState"
import { useGameContext } from "../../../GlobalStates/GameState"
import {REMOVE_PLAYER_ACTIVE} from "../../../GlobalStates/QuestionState/action"
import {UPDATE_PLAYER_STATS} from "../../../GlobalStates/GameState/action"

export default function StrategyDecision({ checkDecision, afterEvent, updateHands, activeHand, ...props }) {


    const [questionState, questionDispatch] = useQuestionContext()
    const [gameState, gameDispatch] = useGameContext()

    const [selected, setSelected] = useState()
    const [decisions, setDecisions] = useState()

    const permanentDecisions = {
        "hit": "Hit",
        "stay": "Stay",
    }

    const getDecisions = () => {
        
        var decisions = {...permanentDecisions}

        if (gameState.current_play.action === "blackjack-insurance" || gameState.current_play.action === "blackjack-no-insurance") {
            return {"blackjack-insurance": "Insurance", "blackjack-no-insurance": "No Insurance"}
        }
        if (activeHand.cardCount() === 1) {
            return {"hit": "Hit"}
        }
        if (activeHand.cardCount() === 2) {
            decisions["double"] = "Double Down"
        }
        if (activeHand && activeHand.canBeSplit()) {
            decisions["split"] = "Split" 
        } 
        if (gameState.rules.canSurrender && activeHand.cardCount() === 2) {
            decisions["surrender"] = "Surrender"
        }
        if (gameState.current_play.dealerHand.getUpcard() === "A" && activeHand.cardCount() === 2) {
            decisions["insurance"] = "Insurance"
        }
        return decisions
    }

    const getRules = () => {
        var rules = "Remember: "
        if (gameState.rules.canDAS) {
            rules += "Players can double down after splitting. "
        } else {
            rules += "Players can double down after splitting. "
        }

        if (gameState.rules.canSurrender) {
            rules += "Players are allowed to surrender."
        } else {
            rules += "Players are not allower to surrender."
        }

        return rules;
    }


    const onClick = (index, decision) => {

        if (!selected) {
            const stat = {
                type: "playing",
                playerDecision: decision,
                correctDecision: gameState.current_play.action,
                trueCount: gameState.prev_play.trueCount,
                dealerUpcard: gameState.current_play.dealerHand.upCard.name + gameState.current_play.dealerHand.upCard.suit[0],
                playerCards : activeHand.cards.map(card => card.name + card.suit[0]).join(",")
            }
            gameDispatch({type: UPDATE_PLAYER_STATS, stat: stat})

            if (checkDecision(decision)) {
                setSelected(index)
                updateHands()
                setTimeout(() => {
                    setSelected(null);
                    afterEvent()
                    questionDispatch({type: REMOVE_PLAYER_ACTIVE})
                }, gameState.difficulty.player_action)
            } else {
                setSelected(index)
                setTimeout(() => {
                    setSelected(null)
                }, 1000)
            }
        }
    }

    return (
        <Segment basic className = "no-padding">
            <Header as="h5" className="white">{getRules()}</Header>
            {Object.entries(getDecisions()).map((decisionPair, index) => {
                return (
                    <Button
                        key = {index}
                        size = "tiny"
                        positive={selected === index && checkDecision(decisionPair[0])}
                        negative={selected === index && !checkDecision(decisionPair[0])}
                        onClick={() => onClick(index, decisionPair[0])}
                    >
                        {decisionPair[1]}
                    </Button>
                )
            })}
            {gameState.game.consideringIndices() && gameState.showCount && 
                <Header as="h5" className = "white">{"(The current true count is " + gameState.prev_play.trueCount + ")"}</Header>
            }
        </Segment>
    )
}