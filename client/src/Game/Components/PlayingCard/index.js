import React from 'react'
import {Image} from "semantic-ui-react"

import "./style.css"


export default function Card({card, ...props}) {

    const getFilename = card => {
        return "/images/cards/" + card.name + card.suit[0] + ".png"
    }

    const getSRC = card => {
        if (!card.isUp()) {
            return "/images/cards/back.png"
        }

        return getFilename(card)
    }



    return (
        
        <Image src = {getSRC(card)} className = {"playing-card " + props.className}/>
        
    )

}