import React from 'react';
import { Container, Card, Button } from 'react-bootstrap'
import useAuth from './useAuth';

const Profile = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
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