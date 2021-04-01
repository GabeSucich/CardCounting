import React from "react"

import { Grid, Header } from "semantic-ui-react"

import "./style.css"

export default function OverallStats({...props}) {

    return (
        <Grid centered>
            <Grid.Column width = {16} textAlign = "center" style = {{paddingTop: "30vh"}}>
                <Header className = "white sunrise" size="huge">Coming soon...</Header>
                <Header size="medium" className="white sunrise">The capability to see stats compiled over many of your training games is currently in development</Header>
            </Grid.Column>
        </Grid>
    )
}