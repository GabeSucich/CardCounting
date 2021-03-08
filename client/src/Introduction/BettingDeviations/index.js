import React from "react"

import { Link } from "react-router-dom"

import { Segment, Grid, Header, Table } from "semantic-ui-react"

import BetChart from "./BetChart"

export default function BettingDeviations({ getUrl, ...props }) {

    return (
        <Segment attached="bottom">
            <Grid verticalAlign="middle" className="overflow page-fit">
                <Grid.Column width={16} textAlign="center">
                    <Header as="h2" className="sunrise section-header">
                        Betting Deviations: Gaining an Edge
                    </Header>
                    <Segment basic className="section-body">
                        Once you have the hang of maintaing the count, the first utilization is what is called <b>betting deviations</b>. <Link to={getUrl("/hilo")}>As mentioned</Link>, a
                        higher true count indicates that the cards to come will favor the player. Thus, when the true count starts to rise, so do your bets. This starts by specifying
                        your <b>betting unit</b> -- ideally, this amount is 1/1000 of your total bankroll, but it may also be the minimum table bet.
                        <br /><br />
                        There are many approaches to varying your bets. The one displayed is simple yet effective, though there are more complicated and profitable ones which are suggested for experienced card-counters. A player employing perfect basic strategy is at a -0.5% disadvantage against the house.
                        <b>With proper card counting, those odds turn positive toward the player!</b> Betting variation accounts for approximately 60-90% of the profits that a card counter expects.
                        It is vital to beating the casino at blackjack.
                    </Segment>
                </Grid.Column>

                <Grid reversed="computer">
                    <Grid.Column computer={6} tablet={6} mobile={16} textAlign="center">
                        <Header as="h2" className="sunrise">
                            Basic Bet Spread
                        </Header>
                        <BetChart />


                    </Grid.Column>
                    <Grid.Column computer={10} tablet={10} mobile={16} verticalAlign="middle" textAlign="center">
                        <Header as="h2" className="sunrise">
                            Why are the bets limited?
                        </Header>
                        <Grid>
                            <Grid.Column computer={8} tablet={8} mobile={8}>
                                <Segment textAlign="center" color="green" inverted>
                                    <Header as="h3" className="sunrise">1. Statistics</Header>
                                A high true count does not guarantee that the player will win the next hand. The edge of the player over the house with
                                bet variation is a statistical inevitability over many many hands. If enough blackjack is played, it is also a statistical inevitability
                                that players will have runs where many consecutive hands are lost when the true count is high. Betting too large can lead to crippling losses.
                            </Segment>
                            </Grid.Column>
                            <Grid.Column computer={8} tablet={8} mobile={8}>
                                <Segment textAlign="center" color="green" inverted>
                                    <Header as="h3" className="sunrise">2. Unwanted Attention</Header>
                                    Card counters bet differently than normal players. Standard blackjack players tend to bet bigger after wins and smaller after losses.
                                    Card counting does not follow this pattern, and casinos know this. Though card counting is not illegal, casinos can ban suspected card counters.
                                    The bigger your bets, the more attention you draw and the sooner you are likely to be thrown out.
                                </Segment>
                            </Grid.Column>
                        </Grid>

                    </Grid.Column>

                    <Grid.Column width={16} textAlign="center">
                        <Header as="h2" className="sunrise">
                            What comes next?
                        </Header>
                        <Segment basic>
                            The next layer to beating blackjack contains what are called <Link to = "/playing">playing deviations</Link>. After you have mastered betting variation,
                            these will elevate your game even further.
                        </Segment>
                    </Grid.Column>


                </Grid>



            </Grid>

        </Segment>
    )
}