import React, { useEffect, useState } from "react"

import { Link, useLocation } from "react-router-dom"

import { Segment, Menu, Dropdown } from "semantic-ui-react"

import {useUserContext} from "../../AuthenticateUser/UserState"
import {SET_USER} from "../../AuthenticateUser/UserState/action"

import UserAPI from "../../utils/APIs/UserAPI"

export default function Navigation({ ...props }) {

    const [activePage, setActivePage] = useState()

    const [userState, userDispatch] = useUserContext()
    
    const loc = useLocation()
    

    useEffect(() => {
        setActivePage(loc.pathname.slice(1))
    }, [])

    const logout = () => {
        UserAPI.logout().then(_ => {
            userDispatch({type: SET_USER})
        })
    }


    return (

        <Menu secondary pointing attached="top" >
            <Menu.Item
                as={Link}
                to="/intro"
                active={activePage === "intro"}
                name="About Card Counting"
                onClick={() => setActivePage("intro")}
            />
            <Menu.Item
                as={Link}
                to="/guide"
                active={activePage === "guide"}
                name="Training Guide"
                onClick={() => setActivePage("guide")}
            />
            <Menu.Item
                as={Link}
                to="/stats"
                active={activePage === "stats"}
                name="My Stats"
                onClick={() => setActivePage("stats")}
            />

            <Menu.Item
                className = "menu-emphasis"
                as={Link}
                to="/train"
                name="Start Practicing"
                onClick={() => setActivePage("train")}
            />

            <Menu.Item 
                onClick = {logout}
                name = "Logout"
                position = "right"
            />


        </Menu>

    )
}