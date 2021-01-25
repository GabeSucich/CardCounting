import React, { useState, useEffect } from "react"
import { Container, Button, Input, Message } from "semantic-ui-react"

import { useGameContext } from "../../GlobalStates/GameState"
import { useQuestionContext } from "../../GlobalStates/QuestionState"

import RunningCount from "./RunningCount"
import TrueCount from "./TrueCount"
import StrategyDecision from "./StrategyDecision"
import DecksRemaining from "./DecksRemaining"

export default function PlayerQuestions({ afterEvent, updateHands, ...props }) {

    const [gameState, g_] = useGameContext()
    const [questionState, q_] = useQuestionContext()

    const [questionsToAsk, setQuestionsToAsk] = useState({})
    const [ready, setReady] = useState(false)

    const chooseQuestions = () => {
        if (Math.random() < questionState.askRunningCount) {
            setQuestionsToAsk({ ...questionsToAsk, runningCount: true })
        }
        if (Math.random() < questionState.askDecksRemaining) {
            setQuestionsToAsk({ ...questionsToAsk, decksRemaining: true })
        }
        if (Math.random() < questionState.askTrueCount) {
            setQuestionsToAsk({ ...questionsToAsk, trueCount: true })
        }

    }

    const checkDecksRemaining = answer => {
        var lowerBound = Math.max(gameState.current_play.decksRemaining - .5, .5)
        var upperBound = Math.min(gameState.current_play.decksRemaining + .5, gameState.game.getTotalDecks())
        if (lowerBound <= answer && answer <= upperBound) {
            return true;
        }
        return false;
    }

    const checkDecision = answer => {
        if (answer === gameState.current_play.action) {
            return true
        }
        return false
    }

    useEffect(() => {

        chooseQuestions()
        setReady(true)
        return (() => {
            setQuestionsToAsk({})
            setReady(false)
        })

    }, [])

    if (!questionState.playerIsActive || !ready) {
        return null
    } else if (questionsToAsk.runningCount) {
        return <RunningCount
            runningCount={gameState.current_play.runningCount}
            questionsToAsk={questionsToAsk}
            setQuestionsToAsk={setQuestionsToAsk}
        />
    } else if (questionsToAsk.decksRemaining) {
        return <DecksRemaining
            numDecks={gameState.game.getTotalDecks()}
            checkDecksRemaining={checkDecksRemaining}
            questionsToAsk={questionsToAsk}
            setQuestionsToAsk={setQuestionsToAsk}
        />
    } else if (questionsToAsk.trueCount) {
        return <TrueCount 
                runningCount = {gameState.current_play.runningCount}
                numDecks = {gameState.current_play.decksRemaining}
                totalDecks = {gameState.game.getTotalDecks()}
                questionsToAsk = {questionsToAsk}
                setQuestionsToAsk = {setQuestionsToAsk}
            />
    }
    else {
        return <StrategyDecision checkDecision={checkDecision} afterEvent={afterEvent} updateHands = {updateHands} />
    }


}



