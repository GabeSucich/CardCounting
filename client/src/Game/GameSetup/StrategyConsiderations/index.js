import React from "react"

import { Checkbox, Divider, Form, Popup, Radio, Segment } from "semantic-ui-react"

import { Link } from "react-router-dom"

export default function StrategyConsiderations({ useIndeces, setIndeces, countWithIndeces, setCountWithIndeces, ...props }) {


    return (
        <Segment textAlign="center">
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
                        label='Basic Strategy and Playing Deviations'
                        checked={useIndeces}
                        onChange={() => setIndeces(true)}
                    />
                </Form.Field>
            </Form>
            <Link to="/test">Learn more about playing deviations and index values</Link>
            <Divider />
            {useIndeces &&
                <Checkbox
                    slider
                    checked={countWithIndeces}
                    onClick={() => setCountWithIndeces(!countWithIndeces)}
                    label={countWithIndeces ? "Give me the true count when asking me for hand decisions" : "Don't give me the true count when asking me for hand decisions"}
                />
            }
            {useIndeces &&
                <Popup
                    position="top center"
                    trigger={countWithIndeces ? <b>Recommended <Link>(Why?)</Link></b> : <b>Very challenging <Link>(Why?)</Link></b>}
                >
                    <Popup.Content>
                        The underlying simulation makes decisions on hands based on calculating the true count exactly, and rounding to the nearest integer.
                        When you are prompted for the true count in game, there is leniency in evaluating your answer. (e.g. If the true count is 4, 3 and 5 will
                        also be considered reasonably good). However, when incorporating index values into your strategy, the "correct" move will be based on the simulation-calculated
                        true count. Thus, for the purpose of really locking down index-incorporated strategy, it will be helpful to know the simulation's calculated true count when making this decision.
                        (The idea is that if you know the index value strategy forward and back, even a rough estimate of the true count at a real table will pay dividends).
            </Popup.Content>

                </Popup>
            }





        </Segment>


    )
}