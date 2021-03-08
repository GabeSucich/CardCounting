import React from "react"

import { Form, Radio, Segment } from "semantic-ui-react"

export default function StrategyConsiderations({ countingCards, setCountingCards, ...props }) {


    return (
        <Segment textAlign = "center">
            <Form>
            <Form.Field>
                <Radio
                    label='Basic Strategy'
                    checked={!countingCards}
                    onChange = {() => setCountingCards(false)}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Basic Strategy and Card Counting'
                    checked={countingCards}
                    onChange={() => setCountingCards(true)}
                />
            </Form.Field>
        </Form>
        
        </Segment>
        

    )
}