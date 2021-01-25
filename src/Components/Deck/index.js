import React, {useEffect, useState} from "react"
import Hand from "../Hand"

import PlayingCard from "../PlayingCard"
import Card from "../../utils/Card"
import { Container } from "semantic-ui-react"

import "./style.css"

export default function Deck({...props}) {

    const dummyCards = [new Card("A", "A", "D", false), new Card("A", "A", "D", false), new Card("A", "A", "D", false), new Card("A", "A", "D", false)]

    

    return (
        <Container>
            {dummyCards.map((card, index) => {
                return <PlayingCard card = {card} key = {index} className = {index === 0 ? "" : "deck-card"}/>
            })}
        </Container>
        
    )


}