import React from 'react'
import {Image, Transition} from "semantic-ui-react"

import "./style.css"


export default function Card({card, ...props}) {

    const getFilename = card => {
        return "/images/" + card.name + card.suit[0] + ".png"
    }

    const getSRC = card => {
        if (!card.isUp()) {
            return "/images/back.png"
        }

        return getFilename(card)
    }



    return (
        
        <Image src = {getSRC(card)} className = {"playing-card " + props.className}/>
        
    )

}