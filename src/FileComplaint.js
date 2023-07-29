import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import LandingPage from './LandingPage';
import useAuth from './useAuth';

// Define the FileComplaint component
const FileComplaint = () => {
    // Set up state for form fields
    const [subject, setSubject] = useState(''); // state for subject field
    const [email, setEmail] = useState(''); // state for email field
    const [message, setMessage] = useState(''); // state for message field

    const { loading, currentUser } = useAuth();
    // If there is no user logged in, return the LandingPage component
    if (!currentUser) {
        return <LandingPage />;
    }

    // Define a function that will be called when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the form from reloading the page

        // Define the complaint object that will be sent to the server
        const complaint = {
            subject, // subject field from form
            email, // email field from form
            message, // message field from form
            resolved: false, // set resolved status to false
        };

        // Make a POST request to the server to create a new complaint
        const response = await fetch('/api/complaints/create-complaint', { // endpoint for complaints
            method: 'POST', // POST method to create a new complaint
            headers: {
                'Content-Type': 'application/json' // specify content type as JSON
            },
            body: JSON.stringify(complaint) // convert complaint object to JSON string
        });

        // If the response was successful (status code in the range 200-299), reset the form fields
        if (response.ok) {
            setSubject('');
            setEmail('');
            setMessage('');
        }
    };

    // Return the form JSX
    return (
        <Form onSubmit={handleSubmit}> {/* when form is submitted, call handleSubmit */}
            <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter subject" value={subject} onChange={(e) => setSubject(e.target.value)} /> {/* bind value to subject state and onChange to setSubject function */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} /> {/* bind value to email state and onChange to setEmail function */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter message" value={message} onChange={(e) => setMessage(e.target.value)} /> {/* bind value to message state and onChange to setMessage function */}
            </Form.Group>

            <Button variant="primary" type="submit"> {/* submit button for form */}
                Submit
            </Button>
        </Form>
    );
}

export default FileComplaint;
