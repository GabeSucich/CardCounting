import React, { useEffect, useState } from "react"
import { Container } from "semantic-ui-react"

import { useGameContext } from "../../GlobalStates/GameState"
import Hand from "../Hand"

export default function Dealer({ afterEvent, ...props }) {

    const [gameState, _] = useGameContext()
    const [hand, setHand] = useState()


    useEffect(() => {


        if (gameState.current_play.playerId === "d") {
            setHand(gameState.current_play.dealerHand)
            setTimeout(() => {
                afterEvent()
            }, gameState.difficulty.deal);
        }

    }, [gameState.current_play])

    return (
        <Container fluid className={props.className}>
            {hand ?
                <Hand hand={hand} /> :
                null}

        </Container>
    )

}