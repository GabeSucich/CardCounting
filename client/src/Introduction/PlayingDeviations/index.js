import React from "react"

import { Link } from "react-router-dom"
import { Segment, Grid, Header, Image} from "semantic-ui-react"

export default function PlayingDeviations({ getUrl, ...props }) {

    return (
        <Segment attached="bottom">
            <Grid centered className="page-fit overflow">
                <Grid.Column width={16} textAlign="center">
                    <Header as="h2" className="sunrise section-header">Playing Deviations</Header>
                    <Segment basic className="section-body">

                        Blackjack basic strategy was developed by documenting which decision in each dealer-player head-to-head is statistically favorable over millions of simulated hands.
                        These simulations were run with no regard to the true count. When these simulations are run and the true count is considered, there are addendums to basic strategy, called <b>playing deviations</b>.
                        There are true count thresholds above and below which it is favorable to make different strategy decisions. For instance, basic strategy says to never take insurance, but it turns out that taking insurance
                        is a favorable move if the true count is three or higher. Playing deviations contribute <b>10-40%</b> of the edge that a card counter expects. Though not as much as betting deviations, this is still significant
                        if you want to really take the house's money.
                        <br /><br />
                        There are many many strategy deviations, the better. The training games here do not include them all -- that would be too much to process for early card counters. Instead, below are 22 of the
                        most "useful" deviations (i.e. those of whose awareness will give you the biggest advantage over basic strategy).
                        <br /><br />
                        It is <b>highly recommended</b> that you not try to tackle playing deviations before mastering basic strategy. It will be counterproductive to memorize deviations from a strategic foundation that is not
                        rock solid.

                </Segment>
                </Grid.Column>
                
                <Grid.Column computer={6} tablet={6} mobile={16} textAlign="center">
                    <Header as="h2" className="sunrise section-header">Illustrious 18</Header>
                    <Segment basic className="section-body" textAlign="center">
                        The 18 most valuable deviations are dubbed the "illustrious 18".
                        <br/>
                        <b>Note: </b> "h17" at the bottom of the chart refers to the variation of blackjack where the dealer must hit on a soft 17.
                        This is in contrast to "s17", where the dealer stands on all 17s.
                    </Segment>
                </Grid.Column>
                <Grid.Column computer = {10} tablet = {10} mobile = {16}>
                    <Image src = "/images/introduction/illustrious18.png" fluid/>
                </Grid.Column>
                <Grid.Column computer={6} tablet={6} mobile={16} textAlign="center">
                    <Header as="h2" className="sunrise section-header">Fab 4</Header>
                    <Segment basic className="section-body" textAlign="center">
                        The 4 most valuable deviations when regarding surrenders (when they are allowed).
                        <br/>
                        <b>Note: </b> "h17" at the bottom of the chart refers to the variation of blackjack where the dealer must hit on a soft 17.
                        This is in contrast to "s17", where the dealer stands on all 17s.
                    </Segment>
                </Grid.Column>
                <Grid.Column computer = {10} tablet = {10} mobile = {16}>
                    <Image src = "/images/introduction/illustrious18.png" fluid/>
                </Grid.Column>
                



            </Grid>
        </Segment>
    )
}