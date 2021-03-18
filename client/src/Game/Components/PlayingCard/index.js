import React from 'react'
import {Image} from "semantic-ui-react"

import "./style.css"


export default function Card({card, active, isFirst, isLast, ...props}) {

    const getFilename = card => {
        return "/images/cards/" + card.name + card.suit[0] + ".png"
    }

    const getSRC = card => {
        if (!card.isUp()) {
            return "/images/cards/back.png"
        }

        return getFilename(card)
    }

    const getClass = () => {
        var className = ""
        if (active) {
            className += "active "
        }
        if (isFirst) {
            className += "first-card "
        }
        if (isLast) {
            className += "last-card "
        }
        className += "playing-card "
        className += props.className
        return className
    }

    console.log(getClass())


    return (
        
        <Image  src = {getSRC(card)} className = {getClass()}/>
        
    )

}