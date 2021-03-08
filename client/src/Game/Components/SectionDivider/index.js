import React from "react"

import {Container, Divider} from "semantic-ui-react"

export default function SectionDivider({separations, ...props}) {
    
    const placeholder = () => {
        const arr = []
        for (var i = 0; i < separations; i++) {
            arr.push(i)
        }
        return arr
    }

    return (
        <Container fluid>
            {placeholder().map(index => {
                
                return  (
                  <Divider hidden key = {index}/>  
                )
                
            })}
        </Container>
    )

}