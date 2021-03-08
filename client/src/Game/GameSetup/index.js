import React, { useState } from 'react'

import { useGameContext} from "../GlobalStates/GameState"
import { CLEAR_GAME, SET_DIFFICULTY, SET_GAME, SET_RULES, SHOW_COUNT  } from "../GlobalStates/GameState/action"

import { useQuestionContext } from "../GlobalStates/QuestionState"
import {  QUESTION_RESET, SET_FREQUENCIES} from "../GlobalStates/QuestionState/action"

import PlayerCount from "./PlayerCount"
import DeckCount from "./DeckCount"
import Rules from "./Rules"
import Goal from "./Goal"
import StrategyConsiderations from "./StrategyConsiderations"
import Difficulty from "./Difficulty"
import Frequency from "./Frequency"


import InfoPopup from "../Components/InfoPopup"
import SectionDivider from "../Components/SectionDivider"

import Game from "../../utils/GameUtils/Game"

import { Grid, Segment, Header, Image, Divider, Button } from 'semantic-ui-react'

import "./style.css"


export default function GameSetup({ ...props }) {

    const [questionState, questionDispatch] = useQuestionContext()
    const [gameState, gameDispatch] = useGameContext()

    const [numPlayers, setNumPlayers] = useState(1)
    const [numDecks, setNumDecks] = useState(4)
    const [rules, setRules] = useState({ canDAS: true, canSurrender: false, h17: true })
    const [useIndices, setIndices] = useState(false)
    const [countWithIndeces, setCountWithIndeces] = useState(true)
    const [countingCards, setCountingCards] = useState(false)

    const [difficulty, setDifficulty] = useState(gameState.difficulty)

    const [frequency, setFrequency] = useState({
        askTrueCount: .3,
        askRunningCount: .3,
        askDecksRemaining: .3
    })

    

    const startGame = () => {

        questionDispatch({type: QUESTION_RESET})
        gameDispatch({type: CLEAR_GAME})

        var considerIndices;

        if (countingCards) {

            console.log("You are counting")
           questionDispatch({type: SET_FREQUENCIES, frequencies: frequency}) 
           gameDispatch({type: SET_DIFFICULTY, difficulty: difficulty})
           gameDispatch({type: SHOW_COUNT, countWithIndeces: countWithIndeces})
           
           considerIndices = useIndices
        } else {
            considerIndices = false
        }

        gameDispatch({type: SET_RULES, rules: rules})


        var game = new Game(numPlayers, numDecks, rules, considerIndices)
        
        while (!game.getHistory().map(item => item.action).includes("split")) {
            game = new Game(numPlayers, numDecks, rules, considerIndices)
        }
        console.log(game.getHistory().map(item => item.action).includes("split"))
        

        gameDispatch({type: SET_GAME, game: game})

        
    
    }

    return (
        <Grid centered className="overflow">


            <Grid.Column width={16} textAlign = "center">
                <Segment basic >
                    <Header size="huge" className="sunrise white" >
                        <Image size="large" src="/images/logo.png" /> Game Settings <Image size="large" src="/images/logo.png" />
                    </Header>
                </Segment>
            </Grid.Column>




            <Grid.Column computer = {5} tablet = {5} mobile = {16} className="overflow">
                <Divider horizontal className="white">Players and Decks</Divider>
                <Grid centered>
                    <Grid.Column computer = {16} tablet = {16} mobile = {8} textAlign="center">
                        <Header as="h3" className="sunrise white">
                            Choose the number of players at the table
                            </Header>
                        <PlayerCount numPlayers={numPlayers} setNumPlayers={setNumPlayers} />
                    </Grid.Column>
                    <Grid.Column computer = {16} tablet = {16} mobile = {8}  textAlign="center">
                        <Header as="h3" className="sunrise white">
                            Choose number of decks in the shoe
                            </Header>
                        <DeckCount numDecks={numDecks} setNumDecks={setNumDecks} />
                    </Grid.Column>
                </Grid>

                <SectionDivider separations={2} />

                <Divider horizontal className="white"> Game Rules</Divider>
                <Grid centered textAlign="center">
                    <Grid.Column width={16} textAlign="center">
                        <Header as="h3" className="sunrise white">
                            Choose the game rules <InfoPopup content={"Different blackjack tables have different rules. The rules of the game will affect your best move during the game."} />
                        </Header>
                        <Rules rules={rules} setRules={setRules} />
                    </Grid.Column>

                </Grid>



            </Grid.Column>
            <Grid.Column computer = {5} tablet = {5} mobile = {16} className="overflow" textAlign="center">
                <Divider horizontal className="white">Goal</Divider>
                <Grid centered>
                    <Grid.Column width={16} textAlign="center" >
                        <Header as="h3" className="sunrise white">
                            What's your goal?
                            </Header>
                        <Goal countingCards={countingCards} setCountingCards={setCountingCards} />
                    </Grid.Column>
                </Grid>
                {countingCards && <SectionDivider separations={1} />}
                {countingCards &&
                    <Divider horizontal className="white">Strategy</Divider>}
                {countingCards &&
                    <Grid centered>
                        <Grid.Column width={16} textAlign="center" >
                            <Header as="h3" className="sunrise white">
                                Choose your strategy considerations <InfoPopup content={"Index values provide a guideline for deviating from basic strategy based on the true count. You can choose to play your game based solely on basic strategy, or also with consideration to index values."} />
                            </Header>
                            <StrategyConsiderations useIndeces={useIndices} setIndeces={setIndices} countWithIndeces = {countWithIndeces} setCountWithIndeces = {setCountWithIndeces}/>
                        </Grid.Column>
                    </Grid>
                }

                <SectionDivider separations = {1}/>
                <Button size = "massive" inverted className = "white" onClick={startGame}>Play Game</Button>

            </Grid.Column>
            {countingCards ?
                <Grid.Column computer = {5} tablet = {5} mobile = {16}  textAlign="center" className="overflow">

                    <Divider horizontal className="white">Difficulty Settings</Divider>

                    <Grid className = "overflow right-column">
                        <Grid.Column width={16}>


                            <Header as="h3" className="sunrise white">
                                <InfoPopup content={"The quicker you can update the count when you are counting cards, the better. Here, you can set control the speed of the game by setting the amount of time between different actions in the game. As you improve your game, you can decrease these times and practice counting faster!"} />
                        How much time between...
                            </Header>
                            <Difficulty difficulty={difficulty} setDifficulty={setDifficulty} />
                       

                        
                            <Header as="h3" className="sunrise white">
                                <InfoPopup content={"Throughout the game, you will be prompted for quantities related to card counting (i.e. the running count, an estimate for the number of decks remaining, and the true count). These prompts will help you track the count, and the more often they are asked, the easier the game is. The lower the numbers below are, the more of a challenge the game will be."} />
                        On what percent of hands should you be prompted for...
                            </Header>
                            <Frequency frequencies={frequency} setFrequency={setFrequency} />
                        </Grid.Column>
                    </Grid>




                </Grid.Column> :
                <Grid.Column computer = {5} tablet = {5} mobile = {16} >

                </Grid.Column>
            }






        </Grid>



        // 
        // <Frequency frequencies={frequency} setFrequency={setFrequency} />


    )


}