import React from "react"

import { Container, Grid } from "semantic-ui-react"

import "./style.css"

import Dealer from "../../Components/Dealer"
import Player from "../../Components/Player"



export default function Double({ game, afterEvent, ...props }) {

    const players = game.getPlayers()
    const activePlayerId = game.getActivePlayerIndex()

    return (

        <Container fluid className="full-size">
            <Dealer afterEvent={afterEvent} className="dealer" />

            {players.map(player => {
                var id = player.id
                var number = id + 1
                return (
                    <Player afterEvent={afterEvent} className={"player" + number + "double"} playerId = {id} activePlayerId = {activePlayerId}/>
                )

            })}
        </Container>

    )

}