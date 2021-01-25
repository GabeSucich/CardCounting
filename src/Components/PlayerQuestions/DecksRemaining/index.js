import React, {useEffect, useState} from "react"

import {Container, Button, Message} from "semantic-ui-react"

export default function DecksRemaining({ numDecks, checkDecksRemaining, questionsToAsk, setQuestionsToAsk, ...props }) {

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
                setSelected([decksRemaining, index])
                setTimeout(() => {
                    setSelected(null);
                    setQuestionsToAsk({ ...questionsToAsk, decksRemaining: false })
                }, 1000)
            } else {
                setSelected([decksRemaining, index])
                setTimeout(() => {
                    setSelected(null);
                }, 1000)
            }
        }
    }

    return (
        <Container fluid>
        {getPossibleValues().map((value, index) => {
            return (
                <Button
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