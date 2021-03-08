import React from "react"

import {Link} from "react-router-dom"

import { Segment, Grid, Image, Header, Divider } from "semantic-ui-react"

export default function HiLoCounting({ getUrl, ...props }) {

    return (
        <Segment attached="bottom" textAlign="center">
            <Grid className="overflow page-fit" centered>
                <Grid.Column width={16} >
                    <Grid verticalAlign="middle" reversed="computer" textAlign="center">
                        <Grid.Column computer = {8} tablet = {10}>
                            <Image fluid src="/images/introduction/hilo.jpeg" />
                        </Grid.Column>
                        <Grid.Column computer={8} tablet = {16} textAlign="center">
                            <Header as="h1" className="sunrise section-header"> The Hi-Lo Method</Header>
                            <Segment basic className="section-body">
                                The Hi-Lo method is one of (if not the) most common method for counting cards.
                                It keeps things simple while being very effective when executed properly. It works as follows:
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <Divider />
                    <Grid.Column width={16}>
                        <Segment basic textAlign="center">
                            <b>1.</b> &nbsp; Before any cards have been dealt, set the <b>running count</b> to zero. <br />
                            <b>2.</b> &nbsp; As the game is played, adjust the running count with the appearance of each new card:

                    </Segment>
                    </Grid.Column>
                    <Grid centered columns={3} verticalAlign="middle">
                        <Grid.Column textAlign="center">
                            <Segment color = "green" inverted>
                                <Header as="h2" className="sunrise"><b>2 - 6</b></Header>
                            +1 to the running count
                        </Segment>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Segment color="grey" inverted>
                                <Header as="h2" className="sunrise"><b>7 - 9</b></Header>
                            No change
                        </Segment>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Segment color = "red" inverted>
                                <Header as="h2" className="sunrise"><b>10 - A</b></Header>
                            -1 from the running count
                        </Segment>
                        </Grid.Column>
                        <Grid.Column width={16} style={{paddingTop: "0"}}>
                            <Segment basic textAlign = "center">
                                The idea here is that the more high cards (10 - A) in the shoe,
                                the more favorable the game is for the player. A very positive running count indicates
                                that there are more high cards than low cards in the deck, and the next hand favors the players.
                                A very negative running count indicates the opposite. This allows players to <Link to={getUrl("/betting")}> vary their bets</Link> from hand
                                to hand.
                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <Divider/>
                    <Grid>
                        <Grid.Column width = {16} textAlign="center">
                            <Header as = "h2" className = "sunrise" style={{ marginBottom: "0px" }}>The True Count</Header>
                            <Segment basic style={{ marginTop: "0px" }}>
                                A running count of +6 when there are 6 decks left in the shoe means something different from when there
                                are only 3 decks remaining. A player is twice as likely to get a high card in the latter scenario. This is why
                                players keep track of the <b>true count</b> -- estimate by dividing the running count by the number of decks remaining
                                in the shoe. This value can be estimated (is difficult to know the exact number of decks remaining), but having a reasonable
                                estimate of the true count is vital for <Link to={getUrl("/betting")}>bet variation</Link> and the use of <Link to={getUrl("/index")}>index values</Link>.
                            </Segment>
                        </Grid.Column>
                    </Grid>

                </Grid.Column>



            </Grid>
        </Segment>
    )

}