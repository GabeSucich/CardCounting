import React, { useContext, createContext, useReducer } from "react"

import { SET_HISTORY, EVOLVE_HISTORY, CLEAR_HISTORY, START_PLAYER_TURN, END_PLAYER_TERM, UPDATE_PLAYER_STATS, SET_RULES, CLEAR_RULES, SET_DIFFICULTY, CLEAR_DIFFICULTY, SET_GAME, GAME_RESET } from "./action"

const GameContext = createContext()
const { Provider } = GameContext

const initial = {
    remaining_history: [],
    current_play: null,
    player_turn: false,
    player_stats: [],
    rules: {},
    difficulty: {
        player_action: 1000,
        deal: 1000,
        clear: 500,
        surrender: 1000,
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_GAME:
            var game = action.game
            var history = action.game.getHistory()
            var remaining_history = [...history.slice(1)]
            var current_play = {...history[0]}
            return {...state, game: game, remaining_history: remaining_history, current_play: current_play}
            break
        case SET_HISTORY:
            return { ...state, remaining_history: [...action.history] }
            break

        case EVOLVE_HISTORY:
            if (state.remaining_history.length === 0) {
                return null
            } else {
                var current_play = {...state.remaining_history[0]}
                var remaining_history = [...state.remaining_history.slice(1)]
                return {...state, current_play : current_play, remaining_history : remaining_history}
            }
            break
        case CLEAR_HISTORY:
            return {...state, current_play: null, remaining_history: []}
            break;
        case START_PLAYER_TURN:
            return {...state, player_turn : true}
            break;
        case END_PLAYER_TERM:
            return {...state, player_turn: false}
            break;
        case UPDATE_PLAYER_STATS:
            return {...state, player_stats: [...state.player_stats, action.stat]}
            break;
        case SET_RULES:
            return {...state, rules: action.rules}
            break;
        case CLEAR_RULES:
            return {...state, rules: {}}
            break
        case SET_DIFFICULTY:
            return {...state, difficulty: {...state.difficulty, ...action.difficulty}}
            break
        case CLEAR_DIFFICULTY:
            return {...state, difficulty: {}}
            break
        case GAME_RESET:
            return initial
    }
}

const GameProvider = ({value=[], ...props}) => {

    const [state, dispatch] = useReducer(reducer, initial)

    return (
        <Provider value = {[state, dispatch]} {...props}/>
    )
}

const useGameContext = () => {
    return useContext(GameContext)
}

export {useGameContext, GameProvider}