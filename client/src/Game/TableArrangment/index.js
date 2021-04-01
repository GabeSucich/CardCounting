import React from "react"

import Single from "./Single"
import Double from "./Double"
import Triple from "./Triple"
import Quartet from "./Quartet"

import {useGameContext} from "../GlobalStates/GameState"


export default function TableArrangement({afterEvent, ...props}) {

    const [gameState, _] = useGameContext()

    const players = gameState.game.getPlayers()


    if (players.length === 1) {
        return <Single afterEvent = {afterEvent} game = {gameState.game}/>
    } else if (players.length === 2) {
        return <Double afterEvent = {afterEvent}  game = {gameState.game}/>
    } else if (players.length === 3) {
        return <Triple afterEvent = {afterEvent}  game = {gameState.game}/>
    } else if (players.length === 4) {
        return <Quartet afterEvent = {afterEvent} game = {gameState.game} />
    }
    

}