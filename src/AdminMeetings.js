import { useEffect, useState } from "react"
import { Button, Form } from 'react-bootstrap'
import useAuth from './useAuth'
import LandingPage from './LandingPage'
import MeetingTemplate from "./templates/MeetingTemplate"

const AdminMeetings = () => {
    const [meetings, getAllMeetings] = useState(null)
    const [timeSlot, filterMeetings] = useState('')

    const { loading, currentUser } = useAuth()
    // If there is no user logged in, return the LandingPage component
    
    useEffect(() => {
        // Need to put conditionals inside useEffect
        // to ensure we load things the same way each time the page loads
        //
        // If there is no user logged in, return the LandingPage component
        if (!currentUser) {
            return <LandingPage />
        }

        const fetchMeetings = async () => {
            try {
                const response = await fetch('/api/meetings/get-meetings', {
                    method: 'POST',
                    headers: {
                        'x-access-token': localStorage.getItem('token'),  // Include the token in request
                        'Content-Type': 'application/json',
                    },
                })
                const json = await response.json()

                if(response.ok){
                    getAllMeetings(json)
                }
            } catch(e) {
                console.error(e)
            }
        }

        fetchMeetings()
    }, [])

    const handleFilter = async (e) => {
        e.preventDefault()

        const response = await fetch('/api/meetings/get-meetings-timeslot', {
            method: 'GET',
            body: json.stringify(timeSlot),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        
        const json = await response.json()

        if(response.ok){
            filterMeetings('')
        }
    }

    return (
        <div className = "adminMeetings">
            <div className = "allMeetings">
                {meetings && meetings.map((meeting) => (
                    <MeetingTemplate key = {meeting._id} meeting = {meeting} />
                ))}
            </div>
            <Form onSubmit = {handleFilter}>
                <Form.Group className = "filterMeetings" controlId = "formTimeSlot">
                    <Form.Label> Filter Date: </Form.Label>
                    <Form.Control type = "datetime-local" placeholder = "Enter Date" value = {timeSlot} onChange = {(e) => handleFilter(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="filter">
                    Filter Meetings
                </Button>
            </Form>
        </div>
    )
}
 
export default AdminMeetings
