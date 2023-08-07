import { useEffect, useState } from 'react'
import LandingPage from './LandingPage'
import useAuth from './useAuth'
import ComplaintTemplate from "./templates/ComplaintTemplate"

const AdminComplaints = () => {
        
    const [complaints, getAllComplaints] = useState(null)
    const { currentUser, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>;
    }

    // If there is no user logged in, return the LandingPage component
    if (!currentUser) {
        return <LandingPage />
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchComplaints = async () => {
            const response = await fetch('http://localhost:5000/api/complaints/get-all-complaints', {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json()

            if (response.ok) {
                getAllComplaints(json)
            }
        }

        fetchComplaints()
    }, []);

    return (
        <div className="adminComplaints">
            <div className="allComplaints">
                {complaints && complaints.map((complaint) => (
                    <ComplaintTemplate key={complaint._id} complaint={complaint} />
                ))}
            </div>
        </div>
    );
}
 
export default AdminComplaints
