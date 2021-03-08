import React from "react"

import {Button} from "semantic-ui-react"

export default function PlayerCount({numDecks, setNumDecks, ...props}) {

    const handleIncrease = () => {
        if (numDecks < 12) {
            setNumDecks(numDecks + 1)
        }
    }
    
    const handleDecrease = () => {
        if (numDecks > 1) {
            setNumDecks(numDecks - 1)
        }
    }

    const pluralize = () => {
        if (numDecks > 1) {
            return "decks"
        }
        return "deck"
    }

    return (
        <Button.Group>
            <Button icon = "minus" color = "red" onClick = {handleDecrease}/>
            <Button>{numDecks + " " + pluralize()}</Button>
            <Button icon = "plus" color = "green" onClick = {handleIncrease}/>
        </Button.Group>

    )

}