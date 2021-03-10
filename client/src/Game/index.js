import React, { useState, useEffect } from "react"


import TableArrangement from "./TableArrangment"

import {useGameContext} from "./GlobalStates/GameState"
import { EVOLVE_HISTORY, FINISH_GAME, CLEAR_GAME, SET_GAME} from "./GlobalStates/GameState/action"

import GameSetup from "./GameSetup"
import GameFinished from "./GameFinished"

import GameAPI from "../utils/APIs/GameAPI"

export default function Game({ numPlayers, numDecks,  ...props }) {

    const [gameState, gameDispatch] = useGameContext()
    const [tempStats, setTempStats] = useState()

    useEffect(() => {

        // Temporary for stat page development
        // GameAPI.getAllGameStats().then(stats => {
        //     console.log(stats)
        //     gameDispatch({type: SET_GAME, game: stats[23].game})
        //     setTempStats(stats[23])
        //     gameDispatch({type: FINISH_GAME})
        // })

        return () => {
            gameDispatch({type: CLEAR_GAME})
        }
    }, [])


    const nextMove = () => {

        if (gameState.remaining_history.length === 0) {
            gameDispatch({type: FINISH_GAME})
        } else {
           gameDispatch({type: EVOLVE_HISTORY}) 
        }
        
    }

    if (gameState.finished) {

        return (
            <GameFinished tempStats = {tempStats}/>
        )
    }

     else if (gameState.game) {
        return (
            // <div></div>
            <TableArrangement afterEvent = {nextMove}/>    
        )
    }
    else {
        // return <div></div>
        return <GameSetup/>
    }
}