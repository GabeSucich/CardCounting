import React from "react"

import { Segment, Image } from "semantic-ui-react"

import PlayingCard from "../PlayingCard"

import "./style.css"

export default function Hand({ hand, active, ...props }) {
    
    return (
        <Segment basic disabled = {hand.isDone() ? true : false} className = "hand">
            <Image.Group>
                {hand.cards.map((card, index) => {
                return (
                    <PlayingCard card={card} key={index} className={index === 0 ? "" : "card-in-hand no-padding"} />
                )
            })}
            </Image.Group>
        </Segment>
    )

}