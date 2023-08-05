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
    if (!currentUser) {
        return <LandingPage />
    }

    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch('/api/meetings/get-meetings')
            const json = await response.json()

            if(response.ok){
                getAllMeetings(json)
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
                    <Form.Control type = "timeslot" placeholder = "Enter Date" value = {timeslot} onChange = {(e) => handleFilter(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="filter">
                    Filter Meetings
                </Button>
            </Form>
        </div>
    )
}
 
export default AdminMeetings
