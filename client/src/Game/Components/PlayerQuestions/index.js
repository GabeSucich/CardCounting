import React, { useState, useEffect } from "react"

import { useGameContext } from "../../GlobalStates/GameState"

import { useQuestionContext } from "../../GlobalStates/QuestionState"


import RunningCount from "./RunningCount"
import TrueCount from "./TrueCount"
import StrategyDecision from "./StrategyDecision"
import DecksRemaining from "./DecksRemaining"

export default function PlayerQuestions({ afterEvent, updateHands, activeHand, ...props }) {

    const [gameState, gameDispatch] = useGameContext()
    const [questionState, questionDispatch] = useQuestionContext()

    const [questionsToAsk, setQuestionsToAsk] = useState({})
    const [ready, setReady] = useState(false)

    const chooseQuestions = () => {
        const questions = {}
        if (Math.random() < questionState.askRunningCount) {
            questions.runningCount = true;
        }
        if (Math.random() < questionState.askDecksRemaining) {
            questions.decksRemaining = true
        }
        if (Math.random() < questionState.askTrueCount) {
            questions.trueCount = true;
        }
        setQuestionsToAsk(questions)

    }

    const checkDecksRemaining = answer => {
        var lowerBound = Math.max(gameState.current_play.decksRemaining - .5, .5)
        var upperBound = Math.min(gameState.current_play.decksRemaining + .5, gameState.game.getTotalDecks())
        if (lowerBound <= answer && answer <= upperBound) {
            return true;
        } else {
            return false;
        }

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
            runningCount={gameState.prev_play.runningCount}
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
            trueCount={gameState.prev_play.trueCount}
            questionsToAsk={questionsToAsk}
            setQuestionsToAsk={setQuestionsToAsk}
        />
    }
    else {
        return <StrategyDecision checkDecision={checkDecision} afterEvent={afterEvent} updateHands={updateHands} activeHand={activeHand} />
    }


}



