import React from "react"
import { Link } from "react-router-dom"

import { Grid, Segment, Header } from "semantic-ui-react"

export default function Forward({ getUrl, ...props }) {


    return (
        <Segment attached="bottom">
            <Grid centered className="page-fit overflow">
                <Grid.Column computer={16} tablet={16} mobile={16}>
                    <Segment>
                        Though most players treat it as a game of gambler's change, Blackjack is one of the very few casino games in which
                        players can give themselves a statistical edge over the house which is significant enough to yield impressive rewards
                        over time. Counting is portrayed in movies as being the stuff of MIT math geniuses, but it is actually a skill
                        which anyone can aquire given a half-decent brain and <b>lots</b> of practice.
                    </Segment>
                    <Header as="h1" className="sunrise">A note on statistics...</Header>
                    <Segment>
                       
                    </Segment>

                    <Header as="h1" className="sunrise">Card counting is precise...</Header>
                    <Segment>
                        The information on the next set of pages may seem daunting at first. You might be tempted to think that 
                    </Segment>
                </Grid.Column>

            </Grid>

        </Segment>




    )

}