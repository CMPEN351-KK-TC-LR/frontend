import React from 'react';
import { Container, Card, Button } from 'react-bootstrap'
import LandingPage from './LandingPage';
import useAuth from './useAuth'; 

const Profile = () => {
    // Use the useAuth hook to get the current user and whether the data is loading
    const { loading, currentUser } = useAuth();

    // If the data is loading, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there is no user found, show the LandingPage for login or registration
    if (!currentUser) {
        return <LandingPage />;
    }

    // If user data is available, display the user's profile
    return (
        // Use a Container to center and a card to display the profile information
        <Container className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{currentUser.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{currentUser.email}</Card.Subtitle>
                    <Button variant="primary" href="/reauth">
                        Change Password
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Profile;
