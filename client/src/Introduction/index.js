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

    const pagePaths = ["/forward", "/strategy", "/hilo", "/betting", "/playing"]
    const pageNames = ["Forward", "Basic Strategy", "Hi-Lo Card Counting", "Betting Deviations", "Playing Deviations"]
    const PageComponents = [Forward, BasicStrategy, HiLoCounting, BettingDeviations, PlayingDeviations]

    const getUrl = path => {
        return match.url + path
    }



    useEffect(() => {

        var foundPage = false
        for (const path of pagePaths) {
            if (loc.pathname.includes(path)) {
                foundPage = true;
                setActivePage(path)
            }
        }
        if (!foundPage) {
            setActivePage(pagePaths[0])
        }

    }, [loc])

    return (

        <Container style={{ marginTop: "5px", paddingTop: "5px" }}>
            <Menu tabular attached="top" className="menu-overflow">
                {pagePaths.map((path, index) => {
                    return (
                        <Menu.Item 
                            as = {Link}
                            to = {getUrl(path)}
                            name = {pageNames[index]}
                            active = {activePage === path}
                            onClick = {() => setActivePage(path)}
                            className = {activePage === path ? "" : "white"}
                            key = {index}
                        />
                    )
                })}

            </Menu>

            <Switch>

                {pagePaths.map((path, index) => {
                    const PageComponent = PageComponents[index]
                    return (
                        <Route path = {getUrl(path)} key = {index}>
                            <PageComponent getUrl = {getUrl} />
                        </Route>
                    )
                })}

                <Route>
                    <Redirect to = {getUrl("/forward")} />
                </Route>

            </Switch>
        </Container>
    )

}
