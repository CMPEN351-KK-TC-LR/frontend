import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);  // State to store the users

    useEffect(() => {
        // Function to fetch users from the server
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers(); // Invoke the function to fetch users
    }, []); // Empty dependency array means this useEffect runs once when component mounts

    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1>Manage Users</h1>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <ListGroup>
                        {users.map(user => (
                            <ListGroup.Item key={user._id}>
                                {user.name} - {user.email}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default ManageUsers;
