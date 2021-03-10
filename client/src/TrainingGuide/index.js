import React, { useState, useEffect } from "react"
import { Route, Switch, Link, useRouteMatch, useLocation, Redirect } from "react-router-dom"

import { Menu, Container, Button, Segment } from "semantic-ui-react"

import Concept from "./Concept"
import GameRules from "./GameRules"
import StrategyConsiderations from "./StrategyConsiderations"
import DifficultySettings from "./DifficultySettings"
import MasteringCardCounting from "./MasteringCardCounting"

import "./style.css"

export default function TrainingGuide({ ...props }) {

    const [activePage, setActivePage] = useState("")
    const pagePaths = ["/concept", "/rules", "/strategy", "/difficulty", "/counting"]
    const pageNames = ["Concept", "Game Rules", "Strategy Considerations", "Difficulty", "Mastering Card Counting"]
    const PageComponents = [Concept, GameRules, StrategyConsiderations, DifficultySettings, MasteringCardCounting]

    let match = useRouteMatch()
    let loc = useLocation()

    const getUrl = path => {
        return match.url + path
    }

    const getNextPage = () => {
        var currentPageIndex = pagePaths.indexOf(activePage);
        currentPageIndex += 1;
        if (currentPageIndex >= pagePaths.length) {
            currentPageIndex = 0
        }
        setActivePage(pagePaths[currentPageIndex])
    }

    const getPrevPage = () => {
        var currentPageIndex = pagePaths.indexOf(activePage);
        currentPageIndex -= 1;
        if (currentPageIndex < 0) {
            currentPageIndex = pagePaths.length - 1
        }
        setActivePage(pagePaths[currentPageIndex])
    }


    useEffect(() => {

        var foundPage = false
        for (const path of pagePaths) {
            if (loc.pathname.includes(path)) {
                setActivePage(path)
                foundPage = true;
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
                            as={Link}
                            to={getUrl(path)}
                            name={pageNames[index]}
                            active={activePage === path}
                            onClick={() => setActivePage(path)}
                            className={activePage === path ? "" : "white"}
                            key={index}
                        />
                    )
                })}

            </Menu>

            <Segment attached="bottom">
                <Switch>

                    {pagePaths.map((path, index) => {
                        const PageComponent = PageComponents[index]
                        return (
                            <Route path={getUrl(path)}>
                                <PageComponent />
                            </Route>
                        )

                    })}

                    <Route>
                        <Redirect to={getUrl("/concept")} />
                    </Route>

                </Switch>
            </Segment>



        </Container>
    )
}