import React, {useState} from "react"

import {Container, Button, Message, Header} from "semantic-ui-react"

import {useGameContext} from "../../../GlobalStates/GameState"
import {UPDATE_PLAYER_STATS} from "../../../GlobalStates/GameState/action"

export default function DecksRemaining({ numDecks, checkDecksRemaining, questionsToAsk, setQuestionsToAsk, ...props }) {

    const [gameState, gameDispatch] = useGameContext()

    const getPossibleValues = () => {
        const values = []
        for (var i = .5; i <= numDecks; i += .5) {
            values.push(i)
        }
        return values;
    }

    const [selected, setSelected] = useState()

    const onClick = (decksRemaining, index) => {

        if (!selected) {
            if (checkDecksRemaining(decksRemaining)) {
                gameDispatch({ type: UPDATE_PLAYER_STATS, stat: { type: "decksRemaining", correct: true } })
                setSelected([decksRemaining, index])
                setTimeout(() => {
                    setSelected(null);
                    setQuestionsToAsk({ ...questionsToAsk, decksRemaining: false })
                }, 1000)
            } else {
                gameDispatch({ type: UPDATE_PLAYER_STATS, stat: { type: "decksRemaining", correct: false } })
                setSelected([decksRemaining, index])
                setTimeout(() => {
                    setSelected(null);
                }, 1000)
            }
        }
    }

    return (
        <Container fluid textAlign = "center">
        <Header className = "white" as="h4">Estimate the number of decks remaining in the shoe...</Header>
        {getPossibleValues().map((value, index) => {
            return (
                <Button
                    style = {{marginBottom: "2px"}}
                    key = {index}
                    positive={selected && selected[1] === index && checkDecksRemaining(value)}
                    negative={selected && selected[1] === index && !checkDecksRemaining(value)}
                    onClick={() => onClick(value, index)}
                >
                    {value}
                </Button>
            )
        })}
        {selected && checkDecksRemaining(selected[0]) && <Message positive>{`${selected[0]} is a good estimate for the number of decks remaining!`}</Message>}
        {selected && !checkDecksRemaining(selected[0]) && <Message negative>{`${selected[0]} is not a great estimate for the number of decks remaining`}</Message>}

    </Container>
    )
    

}