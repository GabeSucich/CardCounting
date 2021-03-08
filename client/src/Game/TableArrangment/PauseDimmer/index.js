import { after } from "lodash"
import React from "react"
import {Button, Dimmer, Divider, Segment} from "semantic-ui-react"

import {useGameContext} from "../../GlobalStates/GameState"
import {GAME_PAUSE, FINISH_GAME} from "../../GlobalStates/GameState/action"

export default function PauseDimmer({afterEvent, ...props}) {

    const [gameState, gameDispatch] = useGameContext()

    const handleContinue = () => {
        gameDispatch({type: GAME_PAUSE})
        afterEvent()

    } 

    const handleExit = () => {
        gameDispatch({type: FINISH_GAME})
        afterEvent()

    }

    return (
        <Dimmer inverted page active = {gameState.paused} onClickOutside = {() => {}}>
            <Segment inverted textAlign = "center">
                <Button size ="massive" inverted color = "green" onClick = {handleContinue} content = "Continue Game"/>
                <Divider hidden/>
                <Button size ="massive" inverted onClick = {handleExit} content = "End Game"/>
            </Segment>
        </Dimmer>
    )
}