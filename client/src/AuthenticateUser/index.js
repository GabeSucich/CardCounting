import React, { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import { GameProvider } from "../Game/GlobalStates/GameState"
import { QuestionProvider } from "../Game/GlobalStates/QuestionState"

import { useUserContext } from "./UserState"
import { SET_USER } from "./UserState/action"

import { Grid, Image } from "semantic-ui-react"

import UserAPI from "../utils/APIs/UserAPI"

import LoginSignup from "./LoginSignup"

import Navigation from "../Navigation"
import Game from "../Game"
import Introduction from "../Introduction"
import TrainingGuide from "../TrainingGuide"
import OverallStats from "../StatDisplays/Overall"

import Loader from "../Components/Loader"

import "./style.css"

export default function AuthenticateUser() {

    const [userState, userDispatch] = useUserContext()
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     UserAPI.findUsername("testuser").then(dbUser => {
            
    //         if (dbUser) {
    //             UserAPI.loginUser("testuser").then(dbUser => {
    //                 userDispatch({ type: SET_USER, user: dbUser })
    //             })
    //         } else {
    //             UserAPI.signup("testuser", "testuser").then(_ => {
    //                 UserAPI.loginUser("testuser").then(dbUser => {
    //                     userDispatch({ type: SET_USER, user: dbUser })
    //                 })
    //             })
    //         }
    //     })
    // }, [])

    useEffect(() => {
        setLoading(true)
        UserAPI.checkCurrenUser().then(currentUser => {
            if (currentUser) {
               userDispatch({type: SET_USER, user: currentUser}) 
            }
            setLoading(false)
        })

    }, [])

    if (loading) {
        return (
            <div className = "background">
                <Grid centered>
                    <Grid.Column width= {16} textAlign = "center" style = {{paddingTop: "25vh"}}>
                        <Image centered src = "/images/logo.png" size = "small" className = "no-bottom-margin"/>
                        <Loader color = "white" width = {128} height = {64}/> 
                    </Grid.Column>

                </Grid>
               
            </div>
            
        )
    }

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
                            <Redirect to={userState.isNew ? "/intro" : "/train"} />
                        </Route>
                    </Switch>

                </div>
            </QuestionProvider>

        )
    } else {
        return (
            <Switch>
                <Route path = "/login">
                     <LoginSignup/>
                </Route>
                <Route>
                    <Redirect to = "/login"/>
                </Route>
               
            </Switch>
            
        )
    }

}