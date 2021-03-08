import React from "react"

import { Container, Grid } from "semantic-ui-react"

import "./style.css"

import Dealer from "../../Components/Dealer"
import Player from "../../Components/Player"

import PauseButton from "../PauseButton" 



export default function Single({ game, afterEvent, ...props }) {
    
    const activePlayerId = game.getActivePlayerIndex()

    return (
        
           <Container fluid className="full-size">
               
               <Dealer afterEvent={afterEvent} className="dealer"/>
               <Player afterEvent={afterEvent} playerId={game.getPlayers()[0].id} className="player1single" activePlayerId = {activePlayerId} />
           </Container>
                
    )

}