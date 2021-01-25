import React from "react"

import { Checkbox, Message, Divider, Container, Segment } from "semantic-ui-react"

import "./style.css"

export default function Rules({ rules, setRules, ...props }) {

    const canDAS = rules.canDAS;
    const canSurrender = rules.canSurrender

    const handleChange = property => {

    }

    return (

        <Segment textAlign="center">
            <Checkbox
                slider
                checked={canDAS}
                onClick={() => setRules({ ...rules, canDAS: !canDAS })}
                label={canDAS ? "Players can double down after splitting a hand" : "Players cannot double down after splitting a hand"}
            />
            <Divider hidden />
            <Checkbox
                slider
                checked={canSurrender}
                onClick={() => setRules({ ...rules, canSurrender: !canSurrender })}
                label={canSurrender ? "Players are allowed to surrender" : "Players are not allowed to surrender"}
            />
        </Segment>

    )

}