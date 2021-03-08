import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import { GameProvider } from "../Game/GlobalStates/GameState"
import { QuestionProvider } from "../Game/GlobalStates/QuestionState"

import { useUserContext } from "./UserState"
import { SET_USER } from "./UserState/action"

import UserAPI from "../utils/APIs/UserAPI"

import Navigation from "../Navigation"
import Game from "../Game"
import Introduction from "../Introduction"

export default function AuthenticateUser() {

    const [userState, userDispatch] = useUserContext()

    useEffect(() => {
        UserAPI.findUsername("testuser").then(dbUser => {
            if (dbUser) {
                UserAPI.loginUser("testuser").then(dbUser => {
                    userDispatch({ type: SET_USER, user: dbUser })
                })
            } else {
                UserAPI.signup("testuser", "testuser").then(_ => {
                    UserAPI.loginUser("testuser").then(dbUser => {
                        userDispatch({ type: SET_USER, user: dbUser })
                    })
                })
            }
        })
    }, [])

    if (userState.user) {
        return (
            <GameProvider>
                <QuestionProvider>
                    <Navigation />
                    <div className="background overflow">
                        <Switch>
                            <Route path="/train">
                                <Game numDecks={4} numPlayers={2} />
                            </Route>
                            <Route path="/intro">
                                <Introduction />
                            </Route>
                            <Route>
                                <Redirect to="/train" />
                            </Route>
                        </Switch>

                    </div>
                </QuestionProvider>
            </GameProvider>

        )
    } else {
        return (
            <div></div>
        )
    }

}