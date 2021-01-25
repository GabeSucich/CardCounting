import React from "react"

import { Grid, Button, Header } from "semantic-ui-react"

export default function Frequency({ frequencies, setFrequency, ...props }) {


    const setTrueCount = frequency => {
        setFrequency({ ...frequencies, askTrueCount: frequency })
    }

    const setRunningCount = frequency => {
        setFrequency({ ...frequencies, askRunningCount: frequency })
    }

    const setDecksRemaining = frequency => {
        setFrequency({ ...frequencies, askDecksRemaining: frequency })
    }

    return (
        <Grid centered>

            <FrequencyChanger frequency={frequencies.askTrueCount} setFrequency={setTrueCount} header="the true count?" />
            <FrequencyChanger frequency={frequencies.askRunningCount} setFrequency={setRunningCount} header="the running count?" />
            <FrequencyChanger frequency={frequencies.askDecksRemaining} setFrequency={setDecksRemaining} header="the numbers of remaining decks?" />
        </Grid>

    )


}

function FrequencyChanger({ frequency, setFrequency, header, ...props }) {

    const handleDecrease = () => {
        if (frequency > 0) {
            setFrequency(eval((frequency - .1).toFixed(2)))
        }
    }
    const handleIncrease = () => {
        if (frequency < 1) {
            setFrequency(eval((frequency + .1).toFixed(2)))
        }
    }



    return (

        <Grid.Column width={16} textAlign = "center">
            <Header as="h5" className = "white button-header">{header} </Header>
            <Button.Group>
                <Button icon="minus" color="red" onClick={handleDecrease} />
                <Button>{frequency * 100 + "%"}</Button>
                <Button icon="plus" color="green" onClick={handleIncrease} />
            </Button.Group>
        </Grid.Column>

    )

}