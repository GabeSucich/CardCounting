import React from "react"
import {Button, Icon} from "semantic-ui-react"

import {useGameContext} from "../../GlobalStates/GameState"
import {GAME_PAUSE} from "../../GlobalStates/GameState/action"

import "./style.css"

import PauseDimmer from "../PauseDimmer"

export default function PauseButton({afterEvent, ...props}) {
    
    const [gameState, gameDispatch] = useGameContext()

    const handleClick = () => {
        gameDispatch({type: GAME_PAUSE})
    }

    return (
        <div>
            <Button className = "pause-button" disabled = {gameState.paused ? true : false} icon="pause" inverted color = "red" onClick = {handleClick}/>
            <PauseDimmer afterEvent = {afterEvent} />
        </div>
        
    )
}
