import React, { useState } from "react"

import { Link } from "react-router-dom"
import { Button, Divider, Icon, Menu, Portal } from "semantic-ui-react"

import { useGameContext } from "../../Game/GlobalStates/GameState"
import { GAME_RESET, CLEAR_GAME } from "../../Game/GlobalStates/GameState/action"

import {useUserContext} from "../../AuthenticateUser/UserState"
import {SET_USER} from "../../AuthenticateUser/UserState/action"

import UserAPI from "../../utils/APIs/UserAPI"


export default function CollapsedMenu({ ...props }) {

    const [gameState, gameDispatch] = useGameContext()
    const [userState, userDispatch] = useUserContext()
    

    const [visible, setVisible] = useState(false)


    const newGame = () => {
        handleClose()
        gameDispatch({ type: CLEAR_GAME })
    }

    const handleClose = () => {
        setVisible(false)
    }

    const logout = () => {
        UserAPI.logout().then(_ => {
            userDispatch({type: SET_USER})
        })
    }


    return (
        <Portal
            openOnTriggerClick
            onOpen={() => setVisible(true)}
            onClose={() => setVisible(false)}
            trigger={!visible ? <Button icon className="corner-menu"><Icon name="bars" /></Button> : null}
            open={visible}
        >
            <Menu vertical className="corner-menu no-margin">
                <Menu.Item>
                    <Menu.Menu>
                        <Menu.Item
                            as={Link}
                            to="/intro"
                            name="Card Counting Guide"
                        />
                        <Menu.Item
                            as={Link}
                            to="/guide"
                            name="Training Guide"
                        />
                        <Menu.Item
                            as={Link}
                            to="/stats"
                            name="Stats"
                        />
                    </Menu.Menu>
                </Menu.Item>
                {gameState.game &&
                    <Menu.Item className="collapsed-menu-item">
                        <Menu.Header
                            as={() => <Button fluid size="mini" primary onClick={newGame}>New Game Settings</Button>}
                        />
                    </Menu.Item>
                }
                <Menu.Item className = "collapsed-menu-item">
                    <Menu.Header 
                        as = {() => <Button fluid size="mini" color = "red" onClick={logout}>Logout</Button>}
                    />
                </Menu.Item>
                


            </Menu>
        </Portal>


    )
}
