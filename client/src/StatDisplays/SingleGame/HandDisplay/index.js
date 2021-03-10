import React from "react"

import Hand from "../../../Game/Components/Hand"

import { Grid, Button, Header, Segment, Divider } from "semantic-ui-react"

import "./style.css"

export default function HandDisplay({ playerHand, dealerHand, getNextPlay, getPrevPlay, trueCount, correctDecision, playerDecision, ...props }) {

    return (
        <Grid centered verticalAlign="middle">

            <DecisionAttribute header="True Count" value={trueCount} />
            <DecisionAttribute header="Correct Decision" value={correctDecision} />
            <DecisionAttribute header="Player's Decision" value={playerDecision} incorrect={playerDecision !== correctDecision} />

            <Grid.Column width = {2}>
                <Button icon="angle double left" floated="right" onClick={getPrevPlay} />
            </Grid.Column>

            <Grid.Column computer={6} tablet={6} mobile={6} textAlign="center">

                <Hand active={false} hand={dealerHand} centered={true} />
            </Grid.Column>

            <Grid.Column computer={6} tablet={6} mobile={6} textAlign="center">
                <Hand active={false} hand={playerHand} centered={true} />
            </Grid.Column>

            <Grid.Column width={2}>
                
                <Button icon="angle double right" floated="left" onClick={getNextPlay} />
            </Grid.Column>
        </Grid>
    )

}

function DecisionAttribute({ header, value, incorrect, ...props }) {
    return (
        <Grid.Column textAlign="center" width={5}>

            <Header as="h3" className="white sunrise decision-header">{header}</Header>
            <Button size="mini" color={incorrect ? "red" : "green"}>{value}</Button>


        </Grid.Column>
    )


}