import React from "react"

import {Image, Segment, Grid, Header, Divider} from "semantic-ui-react"

export default function BasicStrategy({getUrl, ...props}) {

    return (
        <Segment attached = "bottom">
            <Grid className = "overflow">
                <Grid.Column computer = {10} tablet = {9} mobile = {16} className = "page-fit overflow">

                    <Segment basic>
                        The first step in developing your blackjack gameplay is learning basic strategy. The attached chart shows
                        the statistically advantageous move for every combination of player and dealer hands for different rule-sets.
                        Some of these decisions may seem more obvious than others, but each is derived from a statistical analysis of the game.
                    </Segment>
                    <Divider/>
                    <Header as = "h2" className = "sunrise">Can I just use basic strategy without counting cards?</Header>
                    <Segment basic>
                        You're certainly welcome to, but in the long run you won't make any money. A player who never wavers from perfect blackjack player
                        has at best a -0.5% disadvantage against the dealer. Alone, it won't give a player the certainty of success that card counting can.
                        However, successful card counting's foundation is a strict knowledge and adherence to this strategy, and so it must be learned.
                    </Segment>
                    <Divider />
                    <Header as = "h2" className = "sunrise">Do I need to know the entirety of the charts?</Header>
                    <Segment basic>
                        Yes. Strategic blackjack is a game of half percents, fractional odds. Basic strategy is only the first part of the game you are trying 
                        to develop. Adding card counting on top will cause more harm than good if you don't have an rock-solid knowledge of the fundamentals.
                        To be clear, cccasional mistakes are not the end of the world. But, without a doubt, a systemic lack of information on basic strategy will
                        create holes in your game which are sure to inhibit success.
                    </Segment>


                </Grid.Column>
                <Grid.Column computer = {6} tablet = {7} mobile = {16} className = "page-fit overflow">
                    <Image src = "/images/introduction/strategy.png" fluid/>
                </Grid.Column>
            </Grid>
        </Segment>
    )

}