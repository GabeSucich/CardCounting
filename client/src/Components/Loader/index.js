import React from "react"

import ReactLoading from "react-loading"

import "./style.css"

export default function Loader(props) {

    

    const color = props.color || "#0E6EB8"
    const type = props.type || "bubbles"
    
    console.log(color)

    return (
        <div>
        <ReactLoading color = {color} type ={type} className = {"center " + props.className} {...props} />
        </div>
    )
}