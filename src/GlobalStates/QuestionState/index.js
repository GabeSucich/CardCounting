import React, {useReducer, useContext, createContext} from "react"

import {SET_PLAYER_ACTIVE, REMOVE_PLAYER_ACTIVE, SET_FREQUENCIES, QUESTION_RESET} from "./action"

const QuestionContext = createContext()
const {Provider} = QuestionContext

const initial = {
    playerIsActive : false,
    askTrueCount : 0,
    askRunningCount : 0,
    askDecksRemaining : 0,
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_PLAYER_ACTIVE:
            return {...state, playerIsActive: true}
            break
        case REMOVE_PLAYER_ACTIVE:
            return {...state, playerIsActive: false}
            break
        case SET_FREQUENCIES:
            return {...state, ...action.frequencies}
            break
        case QUESTION_RESET:
            return initial
            break;
    }
}

const QuestionProvider = ({value = [], ...props}) => {
    const [state, dispatch] = useReducer(reducer, initial)

    return <Provider value = {[state, dispatch]} {...props}/>
}

const useQuestionContext = () => {
    return useContext(QuestionContext)
}

export {useQuestionContext, QuestionProvider}