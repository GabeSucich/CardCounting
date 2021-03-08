import React, { useState } from "react"
import { Container, Input, Message, Button, Icon, Header } from "semantic-ui-react"

import { useGameContext } from "../../../GlobalStates/GameState"
import { UPDATE_PLAYER_STATS } from "../../../GlobalStates/GameState/action"

export default function RunningCount({ runningCount, questionsToAsk, setQuestionsToAsk, ...props }) {

    const [gameState, gameDispatch] = useGameContext()

    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)
    const [badInputType, setBadInputType] = useState(false)

    const onSubmit = () => {

        if (isNaN(answer)) {
            setAnswer("")
            setBadInputType(true)
            setTimeout(() => {
                setBadInputType(false)
            }, 1000)
        }
        else {
            const entry = eval(answer)
            if (entry || entry === 0) {
                gameDispatch({ type: UPDATE_PLAYER_STATS, stat: { type: "runningCount", playerError: entry - runningCount } })
                if (runningCount === entry) {
                    setCorrect(true)
                    setTimeout(() => {
                        setQuestionsToAsk({ ...questionsToAsk, runningCount: false })
                    }, 1000)
                } else {
                    setIncorrect(true)
                    setTimeout(() => {
                        setQuestionsToAsk({ ...questionsToAsk, runningCount: false })
                    }, 2000)
                }
            }
        }


    }

    return (
        <Container fluid textAlign="center">
            <Header as="h4" className="white">What is the current running count?</Header>
            <Input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                label={<Button icon color="green" onClick={onSubmit}><Icon name="check" ></Icon></Button>}
                labelPosition="right"
            />
            {badInputType && <Message negative>{"You must enter a number for the running count"}</Message>}
            {correct && <Message success>{`Right! The running count is ${runningCount}`}</Message>}
            {incorrect && <Message negative>{`Not quite... The running count is actually ${runningCount}`}</Message>}
        </Container>
    )
}