import React from "react"

import { Checkbox, Divider, Segment } from "semantic-ui-react"

import "./style.css"

export default function Rules({ rules, setRules, ...props }) {

    const canDAS = rules.canDAS;
    const canSurrender = rules.canSurrender
    const h17 = rules.h17


    return (

        <Segment>
            <Checkbox
                slider
                checked={canDAS}
                onChange={() => setRules({ ...rules, canDAS: !canDAS })}
                label={canDAS ? "Players can double down after splitting a hand" : "Players cannot double down after splitting a hand"}
            />
            <Divider hidden />
            <Checkbox
                slider
                checked={canSurrender}
                onChange={() => setRules({ ...rules, canSurrender: !canSurrender })}
                label={canSurrender ? "Players are allowed to surrender" : "Players are not allowed to surrender"}
            />
            <Divider hidden />
            <Checkbox
                slider
                checked={h17}
                onChange={() => setRules({ ...rules, h17: !h17 })}
                label={h17 ? "Dealer must hit on soft 17" : "Dealer must stay on soft 17"}
            />
        </Segment>

    )

}