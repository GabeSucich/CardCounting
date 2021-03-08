import React, { useState, useEffect } from "react"

import { Container, Segment } from "semantic-ui-react"

import { useGameContext } from "../../../GlobalStates/GameState"
import { useQuestionContext } from "../../../GlobalStates/QuestionState"
import { SET_PLAYER_ACTIVE } from "../../../GlobalStates/QuestionState/action"

import Hand from "../../Hand"
import PlayerQuestions from "../../PlayerQuestions"

import "./style.css"

export default function Player({ afterEvent, playerId, ...props }) {

    const [gameState, _] = useGameContext()
    const [hands, setHands] = useState([])
    const [nextHands, setNextHands] = useState([])

    const [questionState, questionDispatch] = useQuestionContext()

    const [activeHand, setActiveHand] = useState()


    const updateHands = () => {
        setHands([...nextHands])
        setNextHands([])
        updateActiveHand()
    }

    const updateActiveHand = () => {
        setActiveHand(null)

        var action = gameState.current_play.action
        if (hands.length > 0 && action) {
            for (const hand of hands) {
                if (!hand.isDone()) {
                    setActiveHand(hand)
                    return
                }
            }
        }

    }

    useEffect(() => {

        if (gameState.current_play.playerId === playerId) {

            updateActiveHand()

            var action = gameState.current_play.action;
            var newHands = gameState.current_play[String(playerId)]
            setNextHands(newHands)


            if (action === "blackjack") {
                setHands(newHands)
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.player_action)
            } else if (action === "insurance") {
                setHands(newHands)
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.player_action)
            }
            else if (action === "deal") {
                setHands(newHands)
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.deal)
            } else if (action === "clear") {
                setHands(newHands)
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.clear)
            } else if (action === "bust") {
                setHands(newHands)
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.clear)
            }
            else {

                questionDispatch({ type: SET_PLAYER_ACTIVE })
            }
        }
    }, [gameState.current_play])

    return (
        <Container className={props.className + " card-container"}>
            {questionState.playerIsActive &&
                <Segment basic compact className="questions" textAlign="center">
                    <PlayerQuestions afterEvent={afterEvent} updateHands={updateHands} activeHand={activeHand} />
                </Segment>
            }
            {hands.map((hand, index) => {
                return (
                    <Hand hand={hand} key={index} active={hand === activeHand} />

                )
            })}
        </Container>
    )

}