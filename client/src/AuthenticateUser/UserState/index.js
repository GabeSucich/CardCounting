import React, {useContext, createContext, useReducer} from "react"

import {SET_USER, SIGNAL_NEW_USER} from "./action"

const UserContext = createContext()
const {Provider} = UserContext

const initial = {
    user: false,
    isNew: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user}
        case SIGNAL_NEW_USER:
            return {...state, isNew: true}
    }
}

const UserProvider = ({value = [], ...props}) => {

    const [state, dispatch] = useReducer(reducer, initial)

    return (
        <Provider value = {[state, dispatch]} {...props} />
    )

}

const useUserContext = () => {
    return useContext(UserContext)
}

export {useUserContext, UserProvider}