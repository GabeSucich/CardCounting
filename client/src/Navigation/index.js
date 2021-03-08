import React, { useState } from "react"

import { Switch, Route} from "react-router-dom"

import TopMenu from "./TopMenu"
import CollapsedMenu from "./CollapsedMenu"

import "./style.css"

export default function Navigation({ ...props }) {

    return (

        <Switch>
            <Route path = "/train">
                <CollapsedMenu/>
            </Route>
            <Route>
                <TopMenu/>
            </Route>
        </Switch>
    )

}