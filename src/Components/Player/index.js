
import React from "react"

import ActivePlayer from "./ActivePlayer"
import PassivePlayer from "./PassivePlayer"

export default function Player({afterEvent, activePlayerId, playerId, ...props}) {

    if (activePlayerId === playerId) {
        return <ActivePlayer afterEvent = {afterEvent} playerId = {playerId} {...props} />
    } else {
        return <PassivePlayer afterEvent = {afterEvent}  playerId = {playerId} {...props} />
    }

}