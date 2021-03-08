import React from "react"

import {Table} from "semantic-ui-react"

export default function BetChart({...props}) {

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>True Count</Table.HeaderCell>
                    <Table.HeaderCell>Bet</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Row>
                <Table.Cell>{"1 or less"}</Table.Cell>
                <Table.Cell>{"1 unit"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>{"2-10"}</Table.Cell>
                <Table.Cell>{"Bet the same number of units as the true count"}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>{"10+"}</Table.Cell>
                <Table.Cell>{"10 units"}</Table.Cell>
            </Table.Row>
            
        </Table>
    )
}