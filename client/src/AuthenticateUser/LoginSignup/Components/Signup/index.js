import React, { useState } from "react"

import { Segment, Header, Divider, Input, List, Button, Message } from "semantic-ui-react"

import {useUserContext} from "../../../UserState"
import {SET_USER, SIGNAL_NEW_USER} from "../../../UserState/action"


import UserAPI from "../../../../utils/APIs/UserAPI"


export default function Signup({ ...props }) {

    const [userState, userDispatch] = useUserContext()

    const [usernameTaken, setUsernameTaken] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [firstPassword, setFirstPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")


    const hasCapitals = () => {
        if (firstPassword.match(/[A-Z]/) === null) {
            return false;
        }
        return true;
    }

    const hasLowerCase = () => {
        if (firstPassword.match(/[a-z]/) === null) {
            return false;
        }
        return true;
    }

    const hasNumber = () => {
        if (firstPassword.match(/[0-9]/) === null) {
            return false;
        }
        return true;
    }

    const isLongEnough = () => {
        return firstPassword.length >= 6
    }


    const validPassword = () => {
        return hasCapitals() && hasLowerCase() && hasNumber() && isLongEnough()
    }

    const attemptSignup = () => {
        setLoading(true)
        UserAPI.findUsername(username).then(dbUser => {
            setLoading(false)
            if (dbUser) {
                alertTakenUsername()
            } else if (firstPassword !== secondPassword) {
                alertPasswordMismatch()
            } else {
                UserAPI.signup(username, firstPassword).then(dbUser => {
                    UserAPI.loginUser(dbUser).then(loggedInUser => {
                        userDispatch({type: SIGNAL_NEW_USER})
                        userDispatch({type: SET_USER, user: loggedInUser})
                        
                    })
                })
            }
        })
    }

    const alertTakenUsername = () => {
        setUsernameTaken(true)

        setUsername("")
        setFirstPassword("")
        setSecondPassword("")

        setTimeout(() => {
            setUsernameTaken(false)
        }, 2000)
    }

    const alertPasswordMismatch = () => {
        setPasswordMismatch(true)

        setFirstPassword("")
        setSecondPassword("")

        setTimeout(() => {
            setPasswordMismatch(false)
        }, 2000)

    }

    return (
        <Segment textAlign="center" loading = {loading}>
            <Header as="h2">Create Account</Header>
            <Input
                value={username}
                onChange={event => setUsername(event.target.value)}
                placeholder="Create username"
                icon="pencil alternate"
                iconPosition="left"
            />
            <Segment basic className="no-top-margin no-bottom-margin">
                <Input
                    value={firstPassword}
                    type="password"
                    placeholder="Create password"
                    onChange={event => setFirstPassword(event.target.value)}
                    icon="pencil alternate"
                    iconPosition="left"

                />
                <List size="mini">
                    <List.Item>
                        <List.Icon
                            name={hasLowerCase() ? "check" : "certificate"}
                            color={hasLowerCase() ? "green" : "red"}
                        />
                        <List.Content className="no-padding">contain a lowercase letter</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon
                            name={hasCapitals() ? "check" : "certificate"}
                            color={hasCapitals() ? "green" : "red"}
                        />
                        <List.Content className="no-padding">contain an uppercase letter</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon
                            name={hasNumber() ? "check" : "certificate"}
                            color={hasNumber() ? "green" : "red"}
                        />
                        <List.Content className="no-padding">contain a number</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon
                            name={isLongEnough() ? "check" : "certificate"}
                            color={isLongEnough() ? "green" : "red"}
                        />
                        <List.Content className="no-padding">contain at least six characters</List.Content>
                    </List.Item>
                </List>
                <Divider/>
                <Input
                    value={secondPassword}
                    type="password"
                    placeholder="Verify password"
                    onChange={event => setSecondPassword(event.target.value)}
                    iconPosition = "left"
                    icon = "pencil alternate"

                />
            </Segment>
            <Button 
                disabled = {validPassword() && secondPassword ? false : true}
                color = "green"
                onClick = {attemptSignup}
            > 
            Signup
            </Button>

            {usernameTaken &&
                <Message negative>
                    An account with that username already exists.
                </Message>
            }

            {passwordMismatch &&
                <Message negative>
                    Passwords must match.
                </Message>
            }

        </Segment>
    )

}