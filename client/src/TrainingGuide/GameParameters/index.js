import React from "react"

import { Link } from "react-router-dom"
import { Grid, Segment, Image, Divider } from "semantic-ui-react"


export default function GameParameters({ ...props }) {
    return (
        <Grid centered className = "page-fit overflow">
            <Grid.Column width={16}>
                <Segment basic textAlign="center">
                    Casinos have different rules regarding blackjack games. Basic strategy varies based on these rules, and you will often want to reference <Link to="/intro/strategy"> the chart which details this variation</Link>. Ideally,
                    you will come to master basic strategy and playing deviations
                    for any combination of game rules. However, when you're first learning it may be advantageous to lay the foundation of basic strategy by practicing with a single,
                    fixed set of rules before adding complexity.
                </Segment>

            </Grid.Column>
            <Grid.Column computer={10} tablet={10} mobile={16} textAlign="center" className="no-padding">
                <Divider/>
                <Segment basic textAlign="center" className="no-top-padding">
                    The setup allows to for customization of the game parameters. The number of decks in the game can range anywhere from 1 to 6, and the number of players in the game
                    can range from 1 (just you) to 4 (you and 3 CPU's). All of the CPU's are programmed to play perfectly strategic under the conditions of each game. Additionally, the rules
                    can be specified regarding surrendering, doubling down after splitting, and whether or not the dealer must hit on a soft 17.
                </Segment>
            </Grid.Column>
            <Grid.Column computer={6} tablet={6} mobile={10}>
                <Image src = "/images/guide/rules.png" fluid/>
            </Grid.Column>
        </Grid>
    )
}