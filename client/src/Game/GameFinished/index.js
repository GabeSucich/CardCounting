import React, { useEffect, useState } from "react"

import { useGameContext } from "../GlobalStates/GameState"
import { CLEAR_GAME, GAME_RESET } from "../GlobalStates/GameState/action"

import GameAPI from "../../utils/APIs/GameAPI"

import { Button, Grid, Header, Segment, Container, Icon, Divider} from "semantic-ui-react"
import Loader from "../../Components/Loader"
import PlayingStats from "../../StatDisplays/SingleGame"

import "./style.css"

export default function GameFinished({ tempStats, ...props }) {

    const [gameState, gameDispatch] = useGameContext()
    const [gameInfo, setGameInfo] = useState()

    useEffect(() => {
        GameAPI.saveGame(gameState.game.numDecks, gameState.game.numPlayers, gameState.player_stats, gameState.rules, gameState.game.considerIndices).then(dbInfo => {
            setGameInfo(dbInfo)
        })
        // setGameInfo(tempStats)
    }, [])

    const restartGame = () => {

        const newGame = gameState.game.createNewGame()
        gameDispatch({ type: GAME_RESET, game: newGame })
    }

    const newGame = () => {
        gameDispatch({ type: CLEAR_GAME })
    }

    const seeStats = () => {
        gameDispatch({ type: CLEAR_GAME })
    }

    if (!gameInfo) {

        return (
            <Container className="display">
                <Grid centered>


                    <Grid.Column computer={16} tablet={16} mobile={16} textAlign="center" verticalAlign="middle">
                        <Segment textAlign="center" compact basic>
                            <Loader color="white" type="bars" />
                            <Header as="h3" color="white">Loading game stats...</Header>

                        </Segment>
                    </Grid.Column>
                    <Divider hidden/>

                    <Grid.Column computer={8} tablet={8} mobile={16} textAlign="center">

                        <Button animated="vertical" onClick={restartGame} inverted color="black" floated="left">
                            <Button.Content visible>
                                Same Game Settings
                    </Button.Content>
                            <Button.Content hidden>
                                <Icon name="history" />
                            </Button.Content>
                        </Button>

                        <Button animated="vertical" onClick={newGame} inverted color="black" floated="right">
                            <Button.Content visible>New Game Settings</Button.Content>
                            <Button.Content hidden><Icon name="random" /></Button.Content>
                        </Button>


                    </Grid.Column>

                </Grid>
            </Container>

        )
    } else {
        return (
            <Container className="display">
                <Grid verticalAlign="middle" centered>


                    <PlayingStats gameInfo={gameInfo}
                        restartGame={restartGame}
                        newGame={newGame}
                    />

                </Grid>
            </Container>

        )
    }
}