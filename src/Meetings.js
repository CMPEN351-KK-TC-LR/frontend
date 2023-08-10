import { useEffect, useState } from "react"
import { Button, Form } from 'react-bootstrap'
import useAuth from './useAuth'
import LandingPage from './LandingPage'
import MeetingTemplate from "./templates/MeetingTemplate"

const Meetings = () => {

    const [meetings, setUserMeetings] = useState(null)
    const [meeting, setMeeting] = useState(null)

    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [room, setRoom] = useState(0)
    const [creator, setCreator] = useState(null)

    const { loading, currentUser } = useAuth()
    const token = localStorage.getItem('token') // Get local token stored
    let headers = {
        'Content-Type': 'application/json', // Make sure requests are sent as JSON
        'x-access-token': token // JWT set
    }

    useEffect(() => {
        // Need to put conditionals inside useEffect
        // to ensure we load things the same way each time the page loads
        //
        // If there is no user logged in, return the LandingPage component
        if (!currentUser) {
            return <LandingPage />
        }

        const fetchMeetings = async () => {
            // Get token from local storage
            
            if (!token) {
                console.error('No authentication')
            }

            // Get all meetings for current user
            let response
            try {
                response = await fetch('http://localhost:5000/api/meetings/get-meetings-user', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(currentUser) // convert current user id to JSON string
                })

                const json = await response.json()

                if(json.ok){
                    setUserMeetings(json)
                }
            } catch(e) {
                console.error(e)
            }
        }

        fetchMeetings()
    }, [currentUser])

    const handleSearchSubmit = async (e) => {
        e.preventDefault()

        let response
        let json
        try {
            // Make a GET request for a meeting with the entered name
            response = await fetch('/api/meetings/get-meeting-name', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({name: name}) // convert meeting name to JSON string
            })
            json = await response.json()
        } catch(e) {
            console.error(e)
        }
        
            
        // If the response was successful (status code in the range 200-299), reset the form field
        if (response.ok) {
            setName('')
            setMeeting(json)
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
            headers: headers,
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
            headers: headers,
            body: JSON.stringify({name: name}) // convert meeting name to JSON string
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
            <Form onSubmit={handleSearchSubmit}>
                <Form.Group className = "meetingSearch" controlId = "formName">
                    <Form.Label> Meeting Name: </Form.Label>
                    <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submitSearch">
                    Find Meeting
                </Button>
            </Form>
            <Form onSubmit={handleAddSubmit}>
                <Form.Group className = "meetingAdd" controlId = "formName">
                    <Form.Label> Meeting Name: </Form.Label>
                    <Form.Control type = "name" placeholder = "Enter name" value = {name} onChange = {(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="meetingAdd" controlId = "formTime">
                    <Form.Label> Enter Time: </Form.Label>
                    <Form.Control type = "datetime-local" placeholder = "Enter meeting date" value = {time} onChange={(e) => setTime(e.target.value)} />
                </Form.Group>

                <Form.Group className="meetingAdd" controlId = "formRoom">
                    <Form.Label> Enter Room: </Form.Label>
                    <Form.Control type = "room" placeholder = "Enter room number" value = {room} onChange={(e) => setRoom(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submitAdd">
                    Add Meeting
                </Button>
            </Form>

            <Form onSubmit={handleDeleteSubmit}>
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
