import React from "react"

import { Button, Form, Radio, Segment } from "semantic-ui-react"

import {Link} from "react-router-dom"

export default function StrategyConsiderations({ useIndeces, setIndeces, ...props }) {


    return (
        <Segment textAlign = "center">
            <Form>
            <Form.Field>
                <Radio
                    label='Basic Strategy Only'
                    checked={!useIndeces}
                    onChange={() => setIndeces(false)}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label='Basic Strategy and Index Values'
                    checked={useIndeces}
                    onChange={() => setIndeces(true)}
                />
            </Form.Field>
        </Form>
        <Link to = "/test">Learn more about index values</Link>
        </Segment>
        

    )
}