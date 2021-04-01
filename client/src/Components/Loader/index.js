import React from "react"

import ReactLoading from "react-loading"

import "./style.css"

export default function Loader({color, type, width, height, ...props}) {

    

    var color = color || "#0E6EB8"
    var type = type || "bubbles"
    var width = width || 64
    var height = height || 64
    
    console.log(color)

    return (
        <div>
        <ReactLoading color = {color} type ={type} className = {"center " + props.className} {...props} width = {width} height = {height}/>
        </div>
    )
}