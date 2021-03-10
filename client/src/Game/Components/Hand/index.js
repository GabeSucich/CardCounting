import React from "react"

import { Segment, Image } from "semantic-ui-react"

import PlayingCard from "../PlayingCard"

import "./style.css"

export default function Hand({ hand, active, centered, ...props }) {
    
    return (
        <Segment basic disabled = {hand.isDone() ? true : false} className = {active ? "hand active" : "hand"}  textAlign= {centered ? "center" : "left"}>
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