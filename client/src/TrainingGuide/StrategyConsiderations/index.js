import React from "react"
import { Link } from "react-router-dom"
import { Grid, Segment, Image, Divider } from "semantic-ui-react"


export default function StrategyConsiderations({ ...props }) {
    return (
        <Grid centered className="page-fit overflow">
            <Grid.Column width={16}>
                <Segment textAlign="center" basic>
                    Because there is a lot of strategy to learn, the simulated games allow you to choose which part(s) of card-counting
                    you would like to practice. In each case, the "correct" decision dictated by the simulation will be based on the mode that you choose.
                    For example, <Link to="/intro/strategy">basic strategy</Link> dictates that it is never favorable to buy insurance against a dealer ace,
                    but the first listed <Link to="/intro/playing">playing deviation</Link> indicates that there are true counts for which insurance is an
                    advantageous side bet.
                    <Divider hidden />
                    <b>NOTE: </b> As mentioned in the description of playing deviations, this program only considers 22 of the most important playing deviations -- the so-called
                    <Link to="/intro/playing">"Illustrious 18"</Link> and <Link to="/intro/playing">"Fab 4"</Link>. Once you have mastered the simulations offered here,
                    adding other playing deviations to your arsenal will be easy.
                    <Divider hidden />
                    The scaffolded levels of strategy are as follows:

                </Segment>
            </Grid.Column>
            <Grid centered className="overflow">

                <Grid.Column computer={5} tablet={16} mobile={16} textAlign="center">
                    <Grid className="no-padding" verticalAlign="middle">
                        <Grid.Column computer={16} tablet={8} mobile={8} textAlign="center" verticalAlign="middle">
                            <Segment inverted>
                                <b>1. Basic Strategy Only</b>
                                <br /><br />
                        For mastering basic strategy before moving on to card-counting. Player's only concern is to learn basic blackjack strategy.
                    </Segment>
                        </Grid.Column>
                        <Grid.Column computer={16} tablet={8} mobile={8}>
                            <Image fluid src="/images/guide/goal1.png" />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>

                <Grid.Column computer={5} tablet={16} mobile={16} textAlign="center">
                    <Grid className="no-padding" verticalAlign="middle">
                        <Grid.Column computer={16} tablet={8} mobile={8} textAlign="center" verticalAlign="middle">
                            <Segment inverted>
                                <b>2. Basic Strategy and Card Counting</b>
                                <br /><br />
                        Decisions are still only made based on basic strategy, but player is prompted with questions related to the count to practice
                        as a layer on top of basic strategy.
                    </Segment>
                        </Grid.Column>
                        <Grid.Column computer={16} tablet={8} mobile={8}>
                            <Image fluid src="/images/guide/goal2.png" />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>

                <Grid.Column computer={5} tablet={16} mobile={16} textAlign="center">
                    <Grid className="no-padding" verticalAlign="middle">
                        <Grid.Column computer={16} tablet={8} mobile={8} textAlign="center" verticalAlign="middle">
                            <Segment inverted>
                                <b>3. Card Counting and Playing Deviations</b>
                                <br /><br />
                        Decisions are still only made based on basic strategy, but player is prompted with questions related to the count to practice
                        as a layer on top of basic strategy.
                    </Segment>
                        </Grid.Column>
                        <Grid.Column computer={16} tablet={8} mobile={8}>
                            <Image fluid src="/images/guide/goal3.png" />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>

            </Grid>



        </Grid>
    )
}