import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { ResidentContext } from "./ResidentProvider"
import { Table } from 'semantic-ui-react'


export const ResidentCard = ( {residents} ) => {

    
    

    return (


        <Table.Row>
            <Table.Cell><Link to={`/residents/${residents.id}`}>{residents.lastName}</Link></Table.Cell>
            <Table.Cell>{residents.houseId}</Table.Cell>
            <Table.Cell>{residents.roomId}</Table.Cell>
            <Table.Cell> daysSinceIntake()</Table.Cell>
        </Table.Row>
               
        
    )
}