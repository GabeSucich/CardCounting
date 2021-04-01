import React from "react"

import {Button} from "semantic-ui-react"

export default function PlayerCount({numPlayers, setNumPlayers, ...props}) {

    const handleIncrease = () => {
        if (numPlayers < 4) {
            setNumPlayers(numPlayers + 1)
        }
    }
    
    const handleDecrease = () => {
        if (numPlayers > 1) {
            setNumPlayers(numPlayers - 1)
        }
    }

    const pluralize = () => {
        return numPlayers > 1 ? "players" : "player"
    }

    return (
        <Button.Group>
            <Button icon = "minus" color = "red" onClick = {handleDecrease}/>
            <Button>{numPlayers  + " " + pluralize()}</Button>
            <Button icon = "plus" color = "green" onClick = {handleIncrease}/>
        </Button.Group>

    )

}


