import React from 'react';
import { Container, Card, Button } from 'react-bootstrap'
import useAuth from './useAuth';
import { useHistory } from 'react-router-dom'

const Profile = () => {
    const history = useHistory() // to allow routing properly
    const { currentUser, loading } = useAuth();

    // Handler for changing password
    const handleChangePassword = () => {
        history.push('/reauth')
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (currentUser === null) {
        // then user not logged in so we need to redirect to home
        history.push('/')
    }

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{currentUser.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{currentUser.email}</Card.Subtitle>
                    <Button variant="primary" onClick={handleChangePassword}>
                        Change Password
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Profile;