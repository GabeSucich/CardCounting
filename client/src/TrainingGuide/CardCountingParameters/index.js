import React from "react"
import { Link } from "react-router-dom"
import { Grid, Segment, Image, Divider } from "semantic-ui-react"


export default function CardCountingParameters({ getUrl, ...props }) {
    return (
        <Grid centered className="page-fit overflow" verticalAlign='middle'>

            <Grid.Column computer={11} tablet={9} mobile={16} textAlign="center">
                <Grid>
                    <Grid.Column width={16}>
                        <Segment basic textAlign="center" style={{ marginBottom: "0px" }}>
                            When you do start practing card-counting, the count-related parameters of the game can be adjusted as follow:
                </Segment>
                        <Segment inverted textAlign="center">
                            <b>Speed Settings</b>
                            <br /><br/>
                                    A faster game makes counting cards more difficult. You can calibrate the game speed settings
                                    based on your comfort level, and increase the difficulty as you improve. The three adjustable times are:
                                    <br /><br />
                            <li>
                                The pause between each CPU's play.
                                    </li>
                            <li>
                                How quickly the cards are dealt.
                                    </li>
                            <li>
                                How quickly hands are cleared at the end of each round.
                                    </li>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column width={16} >
                        <Segment inverted>
                            <b>Question Frequency</b>
                            <br /><br/>
                                    After each of your plays in game, there is an opportunity for prompts to appear testing
                                    your track of the count. (See <Link to={getUrl("/counting")}>the next page </Link> for more details). There are three kinds of prompts,
                                    and you can control the frequency at which each kind of prompt appears. 

                                </Segment>
                    </Grid.Column>
                </Grid>

            </Grid.Column>
            <Grid.Column computer={5} tablet={7} mobile={16} textAlign="center">
                <Image fluid src="/images/guide/countingParams.png" />
            </Grid.Column>


        </Grid>
    )
}