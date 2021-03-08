import React from "react"

import {Header, Segment, Grid, Divider} from "semantic-ui-react"

export default function RuleDisplay({canDAS, canSurrender, h17, playingDeviations, ...props}) {

    return (
        <Grid centered>
            <Grid.Column width = {16} textAlign="center" verticalAlign="middle">
                <Header className="sunrise white" as = "h2">Game Rules</Header>
                <Divider horizontal/>
                <Header className="white" as = "h5">
                    {canDAS ? 
                        "Doubling down after splitting is allowed." :
                        "Doubling down after splitting is not allowed."
                    }
                </Header>
                <Header className="white" as = "h5">
                    {canSurrender ? 
                        "Surrendering is allowed." :
                        "Surrendering is not allowed."
                    }
                </Header>
                <Header className="white" as = "h5">
                    {h17 ? 
                        "The dealer must hit on a soft 17." :
                        "The dealer must stay on a soft 17."
                    }
                </Header>
                <Divider horizontal className="white"/>
                <Header className="white" as = "h5">
                    {playingDeviations ? 
                        "This game incorporated basic strategy and playing deviations." :
                        "This game incorporated only basic strategy."
                    }
                </Header>
            </Grid.Column>
        </Grid>
    )

}