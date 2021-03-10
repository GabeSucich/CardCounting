import React from "react"

import {Header, Segment, Grid, Divider} from "semantic-ui-react"

import "./style.css"

export default function RuleDisplay({canDAS, canSurrender, h17, playingDeviations, ...props}) {

    return (
        <Grid centered>
            <Grid.Column width = {16} textAlign="center" verticalAlign="middle">
                <Header className="sunrise white" as = "h1">Reminder of game rules...</Header>

                <Header className="white rule" as = "h5">
                    {canDAS ? 
                        "Doubling down after splitting was allowed." :
                        "Doubling down after splitting is not allowed."
                    }
                </Header>
                <Header className="white rule" as = "h5">
                    {canSurrender ? 
                        "Surrendering was allowed." :
                        "Surrendering was not allowed."
                    }
                </Header>
                <Header className="white rule" as = "h5">
                    {h17 ? 
                        "The dealer had to hit on soft 17." :
                        "The dealer had to stay on soft 17."
                    }
                </Header>
                <Divider horizontal className="white"/>
                <Header className="white rule" as = "h5">
                    {playingDeviations ? 
                        "This game incorporated basic strategy and playing deviations." :
                        "This game incorporated only basic strategy without playing deviations."
                    }
                </Header>
            </Grid.Column>
        </Grid>
    )

}