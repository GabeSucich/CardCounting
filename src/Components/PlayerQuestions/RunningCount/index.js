import React, {useState} from "react"
import {Container, Input, Message, Button, Icon} from "semantic-ui-react"

export default function RunningCount({ runningCount, questionsToAsk, setQuestionsToAsk, ...props }) {

    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState(false)
    const [incorrect, setIncorrect] = useState(false)

    const onSubmit = () => {
        const entry = eval(answer)
        if (entry) {
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

    return (
        <Container fluid>
            <Input
                type="text"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                label={<Button icon color="green" onClick={onSubmit}><Icon name="check" ></Icon></Button>}
                labelPosition="right"
            />
            {correct && <Message success>{`Right! The running count is ${runningCount}`}</Message>}
            {incorrect && <Message negative>{`Not quite... The running count is actually ${runningCount}`}</Message>}
        </Container>
    )
}