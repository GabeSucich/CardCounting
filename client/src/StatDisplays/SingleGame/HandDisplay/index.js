import React from "react"

import Hand from "../../../Game/Components/Hand"

import {Grid, Button, Header} from "semantic-ui-react"

export default function HandDisplay({playerHand, dealerHand, getNextPlay, getPrevPlay, trueCount, correctDecision, playerDecision, ...props}) {

    return (
        <Grid reversed = "computer tablet" verticalAlign="middle">
            <Grid.Column computer = {6} tablet = {6} mobile = {8} textAlign = "center">
                <Hand active = {false} hand = {dealerHand}/>
            </Grid.Column>
            <Grid.Column computer = {4} tablet = {4} mobile = {16} textAlign="center">
                <Header as = "h4" className="white">True Count: {trueCount}</Header>
                <Header as = "h4" className="white">Correct Decision: {correctDecision}</Header>
                <Header as = "h4" className="white">Player Decision: {playerDecision}</Header>
            </Grid.Column>
            <Grid.Column computer = {6} tablet = {6} mobile = {8} textAlign = "center">
                <Hand active = {false} hand = {playerHand} />
            </Grid.Column>
            
            <Grid.Column width = {16}>
                <Button icon="angle double left" floated = "left" onClick = {getPrevPlay}/>
                <Button icon="angle double right" floated = "right" onClick = {getNextPlay}/>
            </Grid.Column>
        </Grid>
    )

}