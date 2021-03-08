import React, { useEffect, useState } from "react"

import { Route, Switch, Link, useRouteMatch, useLocation, Redirect } from "react-router-dom"

import { Button, Container, Grid, Menu, Segment } from "semantic-ui-react"

import Forward from "./Forward"
import BasicStrategy from "./BasicStrategy"
import HiLoCounting from "./HiLoCounting"
import BettingDeviations from "./BettingDeviations"
import PlayingDeviations from "./PlayingDeviations"


import "./style.css"

export default function Introduction({ ...props }) {

    const [activePage, setActivePage] = useState("")

    let match = useRouteMatch()
    let loc = useLocation()

    const getUrl = path => {
        return match.url + path
    }

    

    console.log(getUrl("hilo"))

    useEffect(() => {

        if (loc.pathname.includes("strategy")) {
            setActivePage("strategy")
        } else if (loc.pathname.includes("hilo")) {
            console.log("hilo")
            setActivePage("hilo")
        } else if (loc.pathname.includes("betting")) {
            setActivePage("betting")
        } else if (loc.pathname.includes("playing")) {
            setActivePage("playing")
        }
        else {
            setActivePage("forward")
        }

    }, [loc])

    return (

        <Container style={{ marginTop: "5px", paddingTop: "5px" }}>
            <Menu tabular attached="top" className="menu-overflow">
                <Menu.Item
                    as={Link}
                    to={getUrl("")}
                    name="Forward"
                    active={activePage === "forward"}
                    onClick={() => setActivePage("forward")}
                    className={activePage === "forward" ? "" : "white"}
                />
                <Menu.Item
                    as={Link}
                    to={getUrl("/strategy")}
                    name="Basic Strategy"
                    active={activePage === "strategy"}
                    onClick={() => setActivePage("strategy")}
                    className={activePage === "strategy" ? "" : "white"}
                />
                <Menu.Item
                    as={Link}
                    to={getUrl("/hilo")}
                    name="Hi-Lo Card Counting"
                    active={activePage === "hilo"}
                    onClick={() => setActivePage("hilo")}
                    className={activePage === "hilo" ? "" : "white"}
                />
                <Menu.Item
                    as={Link}
                    to={getUrl("/betting")}
                    name="Betting Deviations"
                    active={activePage === "betting"}
                    onClick={() => setActivePage("betting")}
                    className={activePage === "betting" ? "" : "white"}
                />
                <Menu.Item
                    as={Link}
                    to={getUrl("/playing")}
                    name="Playing Deviations"
                    active={activePage === "playing"}
                    onClick={() => setActivePage("playing")}
                    className={activePage === "playing" ? "" : "white"}
                />

            </Menu>

            <Switch>

                <Route path={getUrl("/strategy")}>
                    <BasicStrategy getUrl={getUrl} />
                </Route>
                <Route path={getUrl("/hilo")}>
                    <HiLoCounting getUrl={getUrl}/>
                </Route>
                <Route path = {getUrl("/betting")}>
                    <BettingDeviations getUrl = {getUrl}/>
                </Route>
                <Route path = {getUrl("/playing")}>
                    <PlayingDeviations getUrl = {getUrl}/>
                </Route>

                <Route path = {getUrl("/forward")}>
                    <Forward getUrl={getUrl} />
                </Route>
                <Route>
                    <Redirect to = {getUrl("/forward")}/>
                </Route>
            </Switch>





        </Container>
    )

}
