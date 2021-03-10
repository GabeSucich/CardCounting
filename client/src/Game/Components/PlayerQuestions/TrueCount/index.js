import React, { useState } from "react"
import { Container, Input, Message, Button, Icon, Header } from "semantic-ui-react"

import { useGameContext } from "../../../GlobalStates/GameState"
import { UPDATE_PLAYER_STATS } from "../../../GlobalStates/GameState/action"

export default function TrueCount({ trueCount, totalDecks, questionsToAsk, setQuestionsToAsk, ...props }) {

    const lowerBound = trueCount - 1
    const upperBound = trueCount + 1

    const [gameState, gameDispatch] = useGameContext()

    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    const [badInputType, setBadInputType] = useState(false)

    const isReasonable = value => {
        return value >= lowerBound && value <= upperBound
    }

    const deviation = entry => {
        if (isReasonable(entry)) {
            return 0
        } else if (entry > upperBound) {
            return entry - upperBound
        } else if (entry < lowerBound) {
            return entry - lowerBound
        }
    }

    const checkAnswer = () => {

        if (isNaN(answer)) {
            setAnswer("")
            setBadInputType(true)
            setTimeout(() => {
                setBadInputType(false)
            }, 1000)
        } else {
            const entry = eval(answer)

            if (entry || entry === 0) {
                gameDispatch({ type: UPDATE_PLAYER_STATS, stat: { type: "trueCount", difference: deviation(entry) } })
                if (isReasonable(entry)) {
                    setCorrect(true)
                } else {
                    setIncorrect(true)
                }
                setTimeout(() => {
                    setCorrect(false)
                    setIncorrect(false)
                    setQuestionsToAsk({ ...questionsToAsk, trueCount: false })
                }, 2000)
            }


        }


    }


    return (
        <Container fluid textAlign="center">
            <Header as="h4" className="white">Estimate the current true count</Header>
            <Input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                label={ <Button disabled = {answer ? false : true} icon color={answer ? "green" : "grey"} onClick={checkAnswer}><Icon name="check" ></Icon></Button>}
                labelPosition="right"
            />
            {badInputType && <Message negative>{"You must enter a number for the true count."}</Message>}
            {correct && <Message success>{`Yep, ${answer} is a good estimate of the true count!`}</Message>}
            {incorrect && <Message negative>{`Not quite... ${answer} is not really a good estimate of the true count.`}</Message>}
        </Container>
    )
}