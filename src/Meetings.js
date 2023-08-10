import { useEffect, useState } from "react"
import { Button, Form } from 'react-bootstrap'
import useAuth from './useAuth'
import LandingPage from './LandingPage'
import MeetingTemplate from "./templates/MeetingTemplate"

const Meetings = () => {

    const [meetings, getUserMeetings] = useState(null)
    const [meeting, getMeeting] = useState(null)

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [room, setRoom] = useState(0)
    const [creator, setCreator] = useState(null)

    const { loading, currentUser } = useAuth()
    

    useEffect(() => {
        // Need to put conditionals inside useEffect
        // to ensure we load things the same way each time the page loads
        //
        // If there is no user logged in, return the LandingPage component
        if (!currentUser) {
            return <LandingPage />
        }
        const fetchMeetings = async () => {
            // Get all meetings for current user
            const response = await fetch('/api/meetings/get-meetings-user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json' // specify content type as JSON
                },
                body: JSON.stringify(currentUser) // convert current user id to JSON string
            })
            const json = await response.json()

            if(response.ok){
                getUserMeetings(json)
            }
        }

        fetchMeetings()
    }, [currentUser])

    const handleSearchSubmit = async (e) => {
        e.preventDefault()

        // Make a GET request for a meeting with the entered name
        const response = await fetch('/api/meetings/get-meeting-name', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(name) // convert meeting name to JSON string
        })
        const json = await response.json()
            
        // If the response was successful (status code in the range 200-299), reset the form field
        if (response.ok) {
            setName('')
            getMeeting(json)
        }
    }

    const handleAddSubmit = async (e) => {
        e.preventDefault()

        // Define the meeting object that will be sent to the server
        const meeting = {
            name, time, room, creator: currentUser
        }
        
        // Make a POST request to the server to create a new meeting
        const response = await fetch('/api/meetings/create-meeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(meeting) // convert meeting object to JSON string
        })
        
        // If the response was successful (status code in the range 200-299), reset the form fields
        if (response.ok) {
            setName('')
            setTime('')
            setRoom(0)
            setCreator(null)
        }
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()

        // Make a DELETE request to the server to delete a room
        const response = await fetch('/api/meetings/delete-meeting', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(name) // convert meeting name to JSON string
        })
            
        // If the response was successful (status code in the range 200-299), reset the form field
        if (response.ok) {
            setName('')
        }
    }

    return ( 
        <div className = "meetings">
            <div className = "userMeetings">
                {meetings && meetings.map((meeting) => (
                    <MeetingTemplate key = {meeting._id} meeting = {meeting} />
                ))}
            </div>
            <Form onSearchSubmit = {handleSearchSubmit}>
                <Form.Group className = "meetingSearch" controlId = "formName">
                    <Form.Label> Meeting Name: </Form.Label>
                    <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submitSearch">
                    Find Meeting
                </Button>
            </Form>
            <Form onAddSubmit = {handleAddSubmit}>
                <Form.Group className = "meetingAdd" controlId = "formName">
                    <Form.Label> Meeting Name: </Form.Label>
                    <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="meetingAdd" controlId = "formTime">
                    <Form.Label> Enter Time: </Form.Label>
                    <Form.Control type = "date" placeholder = "Enter meeting date" value = {time} onChange={(e) => setTime(e.target.value)} />
                </Form.Group>

                <Form.Group className="meetingAdd" controlId = "formRoom">
                    <Form.Label> Enter Room: </Form.Label>
                    <Form.Control type = "room" placeholder = "Enter room number" value = {room} onChange={(e) => setRoom(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submitAdd">
                    Add Meeting
                </Button>
            </Form>

            <Form onDeleteSubmit = {handleDeleteSubmit}>
                <Form.Group className = "meetingDelete" controlId = "formName">
                    <Form.Label> Meeting Name: </Form.Label>
                    <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submitDelete">
                    Delete Meeting
                </Button>
            </Form>
    </div>
     )
}
 
export default Meetings
