import React, {useState} from "react"
import {Container, Input, Message, Button, Icon} from "semantic-ui-react"

export default function TrueCount({ runningCount, numDecks, totalDecks, questionsToAsk, setQuestionsToAsk, ...props }) {

    const lowerBound = Math.sign(runningCount) * Math.floor(Math.abs(runningCount) / (Math.min(numDecks + .5, totalDecks)))
    const upperBound = Math.sign(runningCount) * Math.ceil(Math.abs(runningCount) / (Math.max(numDecks - .5, .5)))

    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    const isReasonable = value => {
        return value >= lowerBound && value <= upperBound
    }

    const checkAnswer = () => {

        const entry = eval(answer)

        if (isReasonable(entry)) {
            setCorrect(true)
        } else {
            setIncorrect(true)
        }
        setTimeout(() => {
            setCorrect(false)
            setIncorrect(false)
            setQuestionsToAsk({...questionsToAsk, trueCount : false})
        }, 2000)
    }


    return (
        <Container fluid>

            <Input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                label={answer ? <Button icon color="green" onClick={checkAnswer}><Icon name="check" ></Icon></Button> : false}
                labelPosition="right"
            />
            {correct && <Message success>{`Yep, ${answer} is a good estimate of the true count!`}</Message>}
            {incorrect && <Message negative>{`Not quite... ${answer} is not really a good estimate of the true count.`}</Message>}
        </Container>
    )
}