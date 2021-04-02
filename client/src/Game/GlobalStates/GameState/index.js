import React, { useContext, createContext, useReducer } from "react"

import { SET_HISTORY, EVOLVE_HISTORY, START_PLAYER_TURN, END_PLAYER_TERM, UPDATE_PLAYER_STATS, SET_RULES, SET_DIFFICULTY, SHOW_COUNT, SET_GAME, GAME_RESET, FINISH_GAME, CLEAR_GAME } from "./action"

const GameContext = createContext()
const { Provider } = GameContext

const initial = {
    remaining_history: [],
    current_play: null,
    prev_play: null,
    player_turn: false,
    player_stats: [],
    rules: {},
    showCount: true,
    difficulty: {
        player_action: 500,
        deal: 500,
        clear: 500,
        surrender: 500,
    },
    finished: false
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
                var prev_play = {...state.current_play}
                var current_play = {...state.remaining_history[0]}
                var remaining_history = [...state.remaining_history.slice(1)]
                return {...state, prev_play: prev_play, current_play : current_play, remaining_history : remaining_history}
            }
            break
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
        case SHOW_COUNT:
            return {...state, showCount: action.countWithIndeces}
            break
        case SET_DIFFICULTY:
            return {...state, difficulty: {...state.difficulty, ...action.difficulty}}
            break
        case GAME_RESET:
            var game = action.game
            var history = game.getHistory()
            var remaining_history = [...history.slice(1)]
            var current_play = {...history[0]}
            return {...state, game: game, remaining_history: remaining_history, current_play: current_play, prev_play: null, player_turn: false, player_state: [], finished: false}
        case FINISH_GAME:
            return {...state, finished: true}
            break
        case CLEAR_GAME:
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