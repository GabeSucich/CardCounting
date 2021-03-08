import React from "react"

import {Grid, Header, Divider} from "semantic-ui-react"

export default function StatDisplays({averageAbsoluteCountError, averageCountError, decisionAccuracy, runningCountAccuracy, ...props}) {

    const roundedDecisionAccuracy = decisionAccuracy.toFixed(2);
    const roundedRunningCountAccuracy = runningCountAccuracy.toFixed(2)

    return (

    )
}