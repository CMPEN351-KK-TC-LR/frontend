import {useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import LandingPage from './LandingPage'
import useAuth from './useAuth'

const ReplyComplaint = () => {
    
    // Set up initial state for form fields
    const [id, setId] = useState('')
    const [reply, setReply] = useState('')
    const [resolutionDate, setResolutionDate] = useState('')
    
    const { loading, currentUser } = useAuth()
    // If there is no user logged in, return the LandingPage component
    if (!currentUser) {
        return <LandingPage />
    }

    // Function is called when admin selects to reply to complaint
    const handleSubmit = async (e) => {
            e.preventDefault(); // prevent the form from reloading the page
    
        // Define the complaint object that will be sent to the server
        const complaint = {
            id, reply, resolutionDate
        }
    
        // Make a PATCH request to the server to reply to a complaint
        const response = await fetch('/api/complaints/update-complaint', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(complaint) // convert complaint object to JSON string
        })
    
        // If the response was successful (status code in the range 200-299), reset the form fields
        if (response.ok) {
            setId('')
            setReply('')
            setResolutionDate('')
        }
    }
    
    return (
        <Form onSubmit = {handleSubmit}>
        <Form.Group className = "complaintReply" controlId = "formId">
            <Form.Label> Complaint ID: </Form.Label>
            <Form.Control type = "id" placeholder = "Enter ID" value = {id} onChange = {(e) => setId(e.target.value)} />
        </Form.Group>

        <Form.Group className="complaintReply" controlId = "formReply">
            <Form.Label> Reply: </Form.Label>
            <Form.Control as = "textarea" rows={3} placeholder="Enter reply" value={reply} onChange={(e) => setReply(e.target.value)} />
        </Form.Group>

        <Form.Group className = "complaintReply" controlId = "formResolutionDate">
            <Form.Label> Current Date: </Form.Label>
            <Form.Control type = "date" placeholder = "Enter date" value = {resolutionDate} onChange = {(e) => setResolutionDate(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">
            Add Reply
        </Button>
    </Form>
    )
}
 
export default ReplyComplaint
