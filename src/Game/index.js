import React, { useState, useEffect } from "react"


import TableArrangement from "../TableArrangment"

import TrainingGame from "../utils/Game"

import {useGameContext} from "../GlobalStates/GameState"
import {SET_HISTORY, EVOLVE_HISTORY, SET_GAME} from "../GlobalStates/GameState/action"

import GameSetup from "../GameSetup"

export default function Game({ numPlayers, numDecks,  ...props }) {

    const [gameState, gameDispatch] = useGameContext()


    const nextMove = () => {

        gameDispatch({type: EVOLVE_HISTORY})
    }


    if (gameState.game) {
        return (
            
            <TableArrangement afterEvent = {nextMove}/>  
               
        )
    }
    else {
        return <GameSetup/>
    }
}