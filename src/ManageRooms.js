import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import LandingPage from './LandingPage'
import useAuth from './useAuth'

const ManageRooms = () => {

    // Set up initial state for form fields
    const [number, setNumber] = useState(0)
    const [specialRoom, setSpecialRoom] = useState(false)

    const { loading, currentUser } = useAuth()
    // If there is no user logged in, return the LandingPage component
    if (!currentUser) {
        return <LandingPage />
    }

    // Function is called when add room button is selected
    const handleAddSubmit = async (e) => {
        e.preventDefault() // prevent the form from reloading the page

        // Define the room object that will be sent to the server
        const room = {
            number, specialRoom
        }

        // Make a POST request to the server to create a new room
        const response = await fetch('/api/rooms/create-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(room) // convert room object to JSON string
        })

        // If the response was successful (status code in the range 200-299), reset the form fields
        if (response.ok) {
            setNumber(0)
            setSpecialRoom(false)
        }
    }

    // Function is called when delete room button is selected
    const handleDeleteSubmit = async (e) => {
        e.preventDefault() // prevent the form from reloading the page
    
        // Make a DELETE request to the server to delete a room
        const response = await fetch('/api/rooms/delete-room', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(number) // convert room number to JSON string
        })
    
        // If the response was successful (status code in the range 200-299), reset the form field
        if (response.ok) {
            setNumber(0)
        }
    }

    return (
        <div className = "manageRooms">
            <Form onAddSubmit = {handleAddSubmit}>
                <Form.Group className = "roomAdd" controlId = "formNumber">
                    <Form.Label> Room Number: </Form.Label>
                    <Form.Control type = "number" placeholder = "Enter number" value = {number} onChange = {(e) => setNumber(e.target.value)} />
                </Form.Group>

                <Form.Group className="roomAdd" controlId = "formSpecialRoom">
                    <Form.Label> Special Room: </Form.Label>
                    <Form.Control type = "boolean" placeholder = "Enter true or false" value = {specialRoom} onChange={(e) => setSpecialRoom(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submitAdd">
                    Add Room
                </Button>
            </Form>

            <Form onDeleteSubmit = {handleDeleteSubmit}>
                <Form.Group className = "roomDelete" controlId = "formNumber">
                    <Form.Label> Room Number: </Form.Label>
                    <Form.Control type = "number" placeholder = "Enter number" value = {number} onChange = {(e) => setNumber(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submitDelete">
                    Delete Room
                </Button>
            </Form>
        </div>
    )
}
 
export default ManageRooms;
