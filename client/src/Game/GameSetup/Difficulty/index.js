import React from "react"

import { Header, Button, Grid } from "semantic-ui-react"

export default function Difficulty({ difficulty, setDifficulty, ...props }) {


    const setPlayerAction = time => {
        setDifficulty({ ...difficulty, player_action: time })
    }

    const setDeal = time => {
        setDifficulty({ ...difficulty, deal: time })
    }

    const setClear = time => {
        setDifficulty({ ...difficulty, clear: time })
    }

    return (
        <Grid>
            <SpeedChanger time={difficulty.player_action} setTime={setPlayerAction} header = {"each CPU's decisions?"}/>
            <SpeedChanger time={difficulty.deal} setTime={setDeal} header = {"each card is dealt?"}/>
            <SpeedChanger time={difficulty.clear} setTime={setClear} header = {"each player's hand is cleared?"} />

        </Grid>
    )


}

function SpeedChanger({ time, setTime, header, ...props }) {

    const handleDecrease = () => {
        if (time > 250) {
            setTime(time - 250)
        }
    }
    const handleIncrease = () => {
        setTime(time + 250)
    }

    const pluralize = () => {

        if (time / 1000 === 1) {
            return ""
        }
        return "s"
    }

    return (
        <Grid.Column width={16} textAlign="center">
            <Header as="h5" className = "white button-header">{header} </Header>
            <Button.Group>
                <Button icon="minus" color="red" onClick={handleDecrease} />
                <Button>{time / 1000 + " second" + pluralize()}</Button>
                <Button icon="plus" color="green" onClick={handleIncrease} />
            </Button.Group>
        </Grid.Column>

    )

}