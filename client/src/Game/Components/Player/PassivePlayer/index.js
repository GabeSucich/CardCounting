
import React, { useState, useEffect } from "react"

import { Container} from "semantic-ui-react"

import { useGameContext } from "../../../GlobalStates/GameState"

import Hand from "../../Hand"

export default function PassivePlayer({ afterEvent, playerId, ...props }) {

    const [gameState, _] = useGameContext()
    const [hands, setHands] = useState([])
    const [actionMessage, setActionMessage] = useState("")


    useEffect(() => {

        if (gameState.current_play.playerId === playerId) {
            var action = gameState.current_play.action;
            var newHands = gameState.current_play[String(playerId)]
            setHands(newHands)

            if (action === "hit") {
                setActionMessage("Hit!")
                setTimeout(() => {
                    setActionMessage("")
                    afterEvent()
                }, gameState.difficulty.player_action)

            } else if (action === "stay") {
                setActionMessage("Stay")
                setTimeout(() => {
                    setActionMessage("")
                    afterEvent()
                }, gameState.difficulty.player_action)

            } else if (action === "double") {
                setActionMessage("Double down!")
                setTimeout(() => {
                    setActionMessage("")
                    afterEvent()
                }, gameState.difficulty.player_action)

            } else if (action === "split") {

                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.player_action)

            } else if (action === "blackjack") {
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.player_action)
            } else if (action === "deal") {
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.deal)

            } else if (action === "surrender") {
                setActionMessage("Surrender!")
                setTimeout(() => {
                    setActionMessage("")
                    afterEvent()
                }, gameState.difficulty.player_action)

            } else {
                setTimeout(() => {
                    afterEvent()
                }, gameState.difficulty.clear)
            }

        }
    }, [gameState.current_play])


    return (
        <Container className={props.className + " card-container"}>
            
                {hands.map((hand, index) => {
                return (
                    
                        <Hand hand={hand} key={index} />
                   
                )
            })}
           </Container>

    
    )

}