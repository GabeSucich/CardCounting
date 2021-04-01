import React, { useEffect, useState } from "react"

import { Container, Grid, Button, Image, Header, Divider, Icon } from "semantic-ui-react"

import HandDisplay from "./HandDisplay"
import RuleDisplay from "./RuleDisplay"
import StatDisplay from "./StatDisplay"

import Helper from "./helper"

export default function PlayingStats({ gameInfo, restartGame, newGame, ...props }) {

    const [plays, setPlays] = useState()
    const [activePlayIndex, setActivePlayIndex] = useState()

    useEffect(() => {
        if (gameInfo.playingStats.length > 0) {
            const assembledPlays = Helper.assemblePlays(gameInfo.playingStats)
            console.log(assembledPlays)
            setPlays(assembledPlays)
            if (assembledPlays.length > 0) {
                setActivePlayIndex(0)
            }
        }

    }, [])

    const getNextPlay = () => {
        var nextIndex = activePlayIndex + 1;
        if (nextIndex === plays.length) {
            nextIndex = 0
        }
        setActivePlayIndex(nextIndex)
    }

    const getPrevPlay = () => {
        var nextIndex = activePlayIndex - 1;
        if (nextIndex < 0) {
            nextIndex = plays.length - 1
        }
        setActivePlayIndex(nextIndex)
    }

    return (
        <Grid centered className="overflow" verticalAlign="middle">


            {plays ?
                <Grid.Column computer={10} tablet={10} mobile={16}>
                    <HandDisplay
                        dealerHand={plays[activePlayIndex].dealerHand}
                        playerHand={plays[activePlayIndex].playerHand}
                        trueCount={plays[activePlayIndex].trueCount}
                        correctDecision={plays[activePlayIndex].correctDecision}
                        playerDecision={plays[activePlayIndex].playerDecision}
                        getNextPlay={getNextPlay}
                        getPrevPlay={getPrevPlay}
                    />
                </Grid.Column>
                :
                <Grid.Column computer={10} tablet={10} mobile={16} textAlign="center">
                    <Image size="small" src="/images/logo.png" centered />
                    <Header as="h3" className="white">No faulty decisions to display!</Header>
                </Grid.Column>

            }

            {plays ?
                <Grid.Column computer={6} tablet={6} mobile={16}>
                    <RuleDisplay canDAS={gameInfo.canDAS} canSurrender={gameInfo.canSurrender} h17={gameInfo.h17} playingDeviations={gameInfo.playingDeviations} />
                </Grid.Column>
                :
                null
            }


            <Grid.Column computer={10} tablet={10} mobile={16} textAlign="center">
                <StatDisplay
                    runningCountAccuracy={gameInfo.game.runningCountAccuracy}
                    averageAbsoluteCountError={gameInfo.game.averageAbsoluteCountError}
                    averageCountError={gameInfo.game.averageCountError}
                    decisionAccuracy={gameInfo.game.decisionAccuracy}
                />
            </Grid.Column>


            <Grid.Column computer={6} tablet={6} mobile={16} textAlign="center">

                <Header className="sunrise white" as="h1">Play Again</Header>

                <Button animated="vertical" onClick={restartGame} inverted color="black">
                    <Button.Content visible>
                        Same Game Settings
                    </Button.Content>
                    <Button.Content hidden>
                        <Icon name="history" />
                    </Button.Content>
                </Button>

                <Divider />
                <Button animated="vertical" onClick = {newGame} inverted color="black">
                    <Button.Content visible>New Game Settings</Button.Content>
                    <Button.Content hidden><Icon name = "random" /></Button.Content>
                </Button>
                
            </Grid.Column>





        </Grid>
    )
}
