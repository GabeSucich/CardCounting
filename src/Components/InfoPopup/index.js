import React from "react"

import { Popup, Icon } from "semantic-ui-react"

import "./style.css"

export default function InfoPopup({ content, ...props }) {
    return (
        <Popup
            trigger={<Icon size = "tiny" name = "info circle" />}
            className = {props.className}
        >
            <Popup.Content>
                {content}
            </Popup.Content>
        </Popup>

    )
}