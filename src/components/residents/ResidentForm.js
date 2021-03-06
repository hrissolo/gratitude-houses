import React, { useContext, useRef, useEffect, useState } from "react"
import { ResidentContext } from "./ResidentProvider"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'
import "./Resident.css"
import { ResidentList } from "./ResidentList";
import { HouseContext } from "../houses/HouseProvider";
//Edit current resident information

export const ResidentForm = (props) => {
    const { addResident, getResidents, getResidentById, editResident } = useContext(ResidentContext)
    

    //for edit, hold on to state of task in this view
    const [residents, setResidents] = useState({firstName: "", lastName: "", birthdate: "",gender: "",houseId: "", roomId: "", notes: ""})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {residentId} = useParams();
    const history = useHistory()
    const firstName = useRef(null)
    const lastName = useRef(null)
    const birthdate = useRef(null)
    const gender = useRef(null)
    const houseId = useRef(null)
    const roomId = useRef(null)
    const notes = useRef(null)

    const handleControlledInputChange = (event) => {
        const newResident = { ...residents }
        newResident[event.target.name] = event.target.value
        setResidents(newResident)
    }


    useEffect(() => {
        if (residentId){
            getResidentById(residentId)
            .then(resident => {
                setResidents(resident)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
}, [])


    const constructNewResident = () => {
        if (residents === 0) {
            window.alert("Please fill the fields")
        } else {
            setIsLoading(true);
            if (residentId){
                //PUT - update
                editResident({
                    id: residents.id,
                    firstName: residents.firstName,
                    lastName: residents.lastName,
                    birthdate: residents.birthdate,
                    gender: residents.gender,
                    houseId: parseInt(residents.houseId),
                    roomId: parseInt(residents.roomId),
                    intake_date: residents.intake_date,
                    applied_date: residents.applied_date,
                    accepted_date: residents.accepted_date,
                    deny_date: residents.deny_date,
                    discharge_date: residents.discharge_date,
                    notes: residents.notes,
                    payment_method: residents.payment_method,
                    current_location: residents.current_location,
                    desired_intake_date: residents.desired_intake_date
                    
                })
                .then(() => history.push(`/residents/${residents.id}`))
            }else {
                //POST - add
                addResident({
                    id: residents.id,
                    firstName: residents.firstName,
                    lastName: residents.lastName,
                    birthdate: residents.birthdate,
                    gender: residents.gender,
                    houseId: residents.houseId,
                    roomId: residents.roomId,
                    intake_date: residents.intake_date,
                    applied_date: residents.applied_date,
                    accepted_date: residents.accepted_date,
                    deny_date: residents.deny_date,
                    discharge_date: residents.discharge_date,
                    notes: residents.notes,
                    payment_method: residents.payment_method,
                    current_location: residents.current_location,
                    desired_intake_date: residents.desired_intake_date
                })
                .then(() => history.push("/residents"))
            }
        }
    }

    
    return (
        <div className="editFormContainer">
        <Form className="taskForm">
            <div className="edit-form-align">
            <h2 className="taskForm__title">Edit Profile</h2>
            <Form.Group widths='equal'>
                <Form.Field >
                <div className="form-group">
                    <label htmlFor="firstn">First Name: </label>
                    <input type="text" name="firstName" width={5} id="firstName" value={residents.firstName} required autoFocus className="form-control" placeholder="First name" 
                    onChange={handleControlledInputChange}
                    />
                </div>
            </Form.Field>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="lastn">Last Name: </label>
                    <input type="text" width={5} name="lastName" value={residents.lastName} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            </Form.Group>
            
            <Form.Group widths='equal'>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="bday">Birth Date: </label>
                    <input type="text"  width={5} name="birthdate" value={residents.birthdate} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="completeTask">Gender: </label>
                    <input type="text"  width={6} name="gender" value={residents.gender} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            </Form.Group >

            <Form.Field >
                <div className="form-group">
                    <label htmlFor="completeTask">Notes: </label>
                    <input type="text"  width={6} name="notes" value={residents.notes} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            
            <Form.Group widths='equal'>
            <Form.Field >
                <div className="form-group">
                    <label htmlFor="completeTask">House: </label>
                    <input type="number"  width={5} name="houseId" value={residents.houseId} className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>

            <Form.Field >
                <div className="form-group">
                    <label htmlFor="completeTask">Room: </label>
                    <input type="number"  width={5} name="roomId" value={residents.roomId}  className="form-control"
                    onChange={handleControlledInputChange}
                    ></input>
                </div>
            </Form.Field>
            </Form.Group>
            <Button color="purple"type="saveResident"
                disabled={isLoading}
                onClick = {evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewResident()
                }}> {residentId ? <>Save Profile</> : <>Add Resident</>}
                </Button></div>
        </Form></div>
    )
}


