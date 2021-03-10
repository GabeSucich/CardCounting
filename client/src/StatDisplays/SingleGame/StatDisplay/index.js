import React from "react"

import { Grid, Header, Divider, Container, Button } from "semantic-ui-react"

import InfoPopup from "../../../Game/Components/InfoPopup"
import "./style.css"

export default function StatDisplays({ averageAbsoluteCountError, averageCountError, decisionAccuracy, runningCountAccuracy, ...props }) {

    if (averageAbsoluteCountError) {
        var averageAbsoluteError = eval(averageAbsoluteCountError).toFixed(1)
        if (averageAbsoluteError[averageAbsoluteError.length - 1] === "0") {
            averageAbsoluteError = averageAbsoluteError.slice(0, averageAbsoluteError.length - 2)
        }
    }
    if (averageCountError) {
        var averageError = eval(averageCountError).toFixed(1)
        if (averageError[averageError.length - 1] === "0") {
            averageError = averageError.slice(0, averageError.length - 2)
        }
    }
    if (runningCountAccuracy) {
        var countPercent = (eval(runningCountAccuracy) * 100).toFixed(0)
    }
    if (decisionAccuracy) {
        var decisionPercent = (eval(decisionAccuracy) * 100).toFixed(0)
    }

    const accuracyColor = accuracy => {
        if (accuracy < 70) {
            return "red"
        } else if (accuracy < 90) {
            return "orange"
        } else {
            return "green"
        }
    }

    const errorColor = error => {
        if (error <= -1.5 || error >= 1.5) {
            return "red"
        } else if (error < -.5 || error > .5) {
            return "orange"
        } else {
            return "green"
        }
    }


    return (
        <Container fluid textAlign="center" className="no-padding">
            <Header className="white sunrise" as="h1">Game Stats</Header>

            {decisionAccuracy &&
                <Header className="white stat-label" as="h5">
                    <InfoPopup content='The percentage of correct plays that were made as the player was prompted for decisions on each hand. ("Correctness" is based on the rules/considerations of each game).' />
                    Decision Accuracy: &nbsp;&nbsp;&nbsp;
                </Header>
            }
            {decisionAccuracy &&

                <Button className="stat-button" color={accuracyColor(eval(decisionPercent))}>{decisionPercent + "%"}</Button>
            }

            <br />

            {runningCountAccuracy &&
                <Header className="white stat-label" as="h5">
                    <InfoPopup content="The percentage of time that the player entered the correct running count when prompted." />
                    Running Count Accuracy: &nbsp;&nbsp;&nbsp;
                </Header>
            }

            {runningCountAccuracy &&
                <Button className="stat-button" color={accuracyColor(eval(countPercent))}>{countPercent + "%"}</Button>
            }

            <br />

            {averageAbsoluteCountError &&
                <Header className="white stat-label" as="h5">
                    <InfoPopup content="The average absolute error between the actual running count and player's track of the running count. Note that this statistic treats all errors as 'positive', and so it generally reflects how well the player kept the count." />
                Average Absolute Running Count Error: &nbsp;&nbsp;&nbsp;
            </Header>
            }

            {averageAbsoluteCountError &&
                <Button className="stat-button" color={errorColor(eval(averageAbsoluteError))}>{averageAbsoluteError}</Button>
            }

            <br/>

            {averageCountError &&
                <Header className="white stat-label" as="h5">
                    <InfoPopup content="The average error between the running count and player's track of the running count, where the errors are treated as both positive and negative. This average will be less than the absolute average, but it's value will be a more specific evaluation of whether students are overestimating (positive) or underestimating (negative) the running count." />
            Running Count Bias: &nbsp;&nbsp;&nbsp;
    </Header>
            }

            {averageCountError &&
                <Button className="stat-button" color={errorColor(eval(averageError))}>{averageError}</Button>
            }

        </Container>




    )
}
