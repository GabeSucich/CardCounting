import React, { useEffect, useState } from "react"

import { Container, Grid, Segment, Image, Header } from "semantic-ui-react"

import HandDisplay from "./HandDisplay"
import RuleDisplay from "./RuleDisplay"

import Helper from "./helper"

export default function PlayingStats({ gameInfo, ...props }) {

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
        <Grid centered>
            {plays ?
                <Grid.Column width={8}>
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
                <Grid.Column width={8} textAlign="center">
                    <Image size="small" src="/images/logo.png" centered />
                    <Header as="h3" className="white">No faulty decisions to display!</Header>
                </Grid.Column>

            }

            {plays ? 
            <Grid.Column width = {8}>
                <RuleDisplay canDAS = {gameInfo.canDAS} canSurrender = {gameInfo.canSurrender} h17 = {gameInfo.h17} playingDeviations = {gameInfo.playingDeviations}/>
            </Grid.Column>
            :
            null
        }

        </Grid>
    )
}
