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
import TrainingGuide from "../TrainingGuide"
import OverallStats from "../StatDisplays/Overall"

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
                        <Route path="/guide">
                            <TrainingGuide />
                        </Route>
                        <Route path="/stats">
                            <OverallStats />
                        </Route>
                        <Route>
                            <Redirect to="/train" />
                        </Route>
                    </Switch>

                </div>
            </QuestionProvider>

        )
    } else {
        return (
            <div></div>
        )
    }

}