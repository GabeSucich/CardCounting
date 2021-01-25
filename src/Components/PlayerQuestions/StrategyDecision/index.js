
import React, {useState} from "react"

import {Segment, Button, Header} from "semantic-ui-react"

import {useQuestionContext} from "../../../GlobalStates/QuestionState"
import { useGameContext } from "../../../GlobalStates/GameState"
import {REMOVE_PLAYER_ACTIVE} from "../../../GlobalStates/QuestionState/action"

export default function StrategyDecision({ checkDecision, afterEvent, updateHands, ...props }) {


    const [questionState, questionDispatch] = useQuestionContext()
    const [gameState, gameDispatch] = useGameContext()

    const decisions = {
        "hit": "Hit",
        "stay": "Stay",
        "double": "Double Down",
        "split": "Split",
        "surrender": "Surrender"
    }

    const [selected, setSelected] = useState()

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
            {Object.entries(decisions).map((decisionPair, index) => {
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
        </Segment>
    )
}