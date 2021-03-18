import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Segment, Image, Button, List, Divider } from "semantic-ui-react"


export default function MasteringCardCounting({ getUrl, ...props }) {

    const [activeImageIndex, setActiveIndex] = useState(0)
    const images = ["decision.png", "runningCount.png", "trueCount.png", "numDecks.png"]

    const nextImage = () => {
        var nextIndex = activeImageIndex + 1
        if (nextIndex === images.length) {
            nextIndex = 0;
        }
        setActiveIndex(nextIndex)
    }

    const prevImage = () => {
        var nextIndex = activeImageIndex - 1
        if (nextIndex < 0) {
            nextIndex = images.length - 1
        }
        setActiveIndex(nextIndex)
    }

    const imagePath = () => {
        return "/images/guide/" + images[activeImageIndex]
    }

    return (
        <Grid className="page-fit overflow" centered verticalAlign="middle">
            <Grid.Column width={16}>
                <Segment basic textAlign="center" style={{ margin: "0", paddingBottom: "0" }}>
                    Based on the <Link to={getUrl("/strategy")}>strategy considerations</Link> of your game, there are many different promps that you may receive on each turn. These include
                    asking for the running count, true count, and an estimate for the number of decks remaining in the shoe, as well as the obligatory decision to hit, stay, etc... These prompts
                    capture the metrics that you need to constantly track through a real game, and your accuracy is a direct reflection of your progress. Some notes on each kind of prompt are listed below.
                    After you've read through this short training guide, you should be ready to <Link to = "/train">start practicing!</Link>
                </Segment>
            </Grid.Column>
            <Grid centered reversed="computer" verticalAlign="middle">
                <Grid.Column computer={7} tablet={12} mobile={16} textAlign="center">
                    <Grid centered verticalAlign="middle">
                        <Grid.Column width={2} textAlign="center">
                            <Button className="toggle-button" icon="angle left" onClick={prevImage} />
                        </Grid.Column>
                        <Grid.Column width={12} textAlign="center" style={{ paddingLeft: "0", paddingRight: "0" }}>
                            <Image centered fluid src={imagePath()} />
                        </Grid.Column>
                        <Grid.Column width={2} textAlign="center">
                            <Button className="toggle-button" icon="angle right" onClick={nextImage} />
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column computer={9} tablet={16} mobile={16} textAlign="center">

                    <Segment basic style={{ margin: "0" }}>
                        <List as="ul">
                            <List.Item as="li">
                                <b>Decision: </b>
                            On each turn, you'll be asked to hit, stat, double down, etc... Selecting the strategically correct 
                            play will progress the game forward -- choosing incorrect plays will keep the prompt on screen and the game stopped.
                        </List.Item>
                            <Divider />
                            <List.Item as="li">
                                <b>Running Count: </b>
                            When you're asked for the running count, input your current track of the count. Regardless of if you arre correct or not,
                            the prompt will give you the actual running count after you first entry, which can reorient you if you are off.
                        </List.Item>
                            <Divider />
                            <List.Item as="li">
                                <b>Decks Remaining: </b>
                            You also may be asked to estimate the number of decks remaining. Here, there will be options up to the number of decks in the initial shoe,
                            in increments of .5.
                        </List.Item>
                            <Divider />
                            <List.Item as="li">
                                <b>True Count: </b>
                            Because the dividing the running count by the number of decks is not an exact science, there is some leeway when entering the true count.
                            For instance, if the running count is 5 and the number of decks remaining is around 4 - 4.5, a true count estimate of 0 or 1 will be evaluated as
                            "correct". Like the running count, the game will proceed after your first entry, regardless of correctness.
                        </List.Item>


                        </List>
                    </Segment>
                </Grid.Column>


            </Grid>

        </Grid>
    )
}