import React, { useEffect, useState } from "react"

import { Divider, Grid, Header, Message } from "semantic-ui-react"

import UserAPI from "../../utils/APIs/UserAPI"
import { useUserContext } from "../UserState"
import { SET_USER } from "../UserState/action"

import Login from "./Components/Login"
import Signup from "./Components/Signup"

import "./style.css"

export default function LoginSignup({ ...props }) {

    const [userState, userDispatch] = useUserContext()

    const [user, setUser] = useState()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const [invalidUsername, setInvalidUsername] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [loadingCredentials, setLoadingCredentials] = useState(false)

    useEffect(() => {
        return () => {
            setUser(null);
            setUsername(null);
            setPassword(null);
            setInvalidUsername(false);
            setInvalidPassword(false)
            setLoadingCredentials(false);
        }
    }, [])

    const alertInvalidUsername = () => {
        setUsername("")
        setPassword("")
        setInvalidUsername(true)
        setLoadingCredentials(false)
        setTimeout(() => {
            setInvalidUsername(false)
        }, 1500)
    }

    const alertInvalidPassword = () => {
        setPassword("")
        setInvalidPassword(true)
        setLoadingCredentials(false)
        setTimeout(() => {
            setInvalidPassword(false)
        }, 2000)
    }

    const checkUsername = () => {
        return UserAPI.findUsername(username).then(dbUser => {
        
            if (!dbUser) {
                alertInvalidUsername()
                return false;
            } else {
                setUser(dbUser)
                return dbUser;
            }
        })
    }

    const checkPassword = (user) => {
        if (!user) {
            setLoadingCredentials(false)
            return;
        } else if (UserAPI.checkPassword(password, user.password)) {
            console.log("Password was correct")
            UserAPI.loginUser(user).then(dbUser => {
                userDispatch({ type: SET_USER, user: dbUser })
            })
        } else {
            console.log("password was incorrect")
            setLoadingCredentials(false)
            alertInvalidPassword()
        }
    }

    const attemptLogin = () => {
        setLoadingCredentials(true)
        checkUsername().then(validUser => {
    
            if (!validUser) {
                setLoadingCredentials(false)
                alertInvalidUsername()
            } else {
                checkPassword(validUser)
            }
        })
    }

    return (
        <div className="login-background overflow">
            <Grid centered>
                <Grid.Column computer={12} tablet={14} mobile={16} textAlign="center">
                    <Grid style={{ marginTop: "20px" }} centered >
                        <Grid.Column computer={10} tablet={10} mobile={12} textAlign="center">

                            <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} attemptLogin={attemptLogin} invalidUsername={invalidUsername} invalidPassword={invalidPassword} loadingCredentials={loadingCredentials} />

                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6} mobile={12} textAlign="center">
                            <Signup />
                        </Grid.Column>

                    </Grid>




                </Grid.Column>
            </Grid>
        </div>
    )
}