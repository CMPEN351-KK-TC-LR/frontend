import { useEffect, useState } from 'react'
import LandingPage from './LandingPage'
import useAuth from './useAuth'
import ComplaintTemplate from "./templates/ComplaintTemplate"

const AdminComplaints = () => {
        
    const [complaints, getAllComplaints] = useState(null)
    
    const { loading, currentUser } = useAuth()
    // If there is no user logged in, return the LandingPage component
    if (!currentUser) {
        return <LandingPage />
    }

    useEffect(() => {
        const fetchComplaints = async () => {
            const response = await fetch('/api/complaints/get-all-complaints')
            const json = await response.json()

            if(response.ok){
                getAllComplaints(json)
            }
        }

        fetchComplaints()
    }, [])

    return (
        <div className = "adminComplaints">
            <div className = "allComplaints">
                {complaints && complaints.map((complaint) => (
                    <ComplaintTemplate key = {complaint._id} complaint = {complaint} />
                ))}
            </div>
        </div>
    )
}
 
export default AdminComplaints
