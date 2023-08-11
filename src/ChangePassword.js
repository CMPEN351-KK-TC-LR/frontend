import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Formik } from 'formik' // for form validation
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import useAuth from './useAuth'

const ChangePassword = () => {
    const { currentUser } = useAuth()

    // How to validate the input on front end for registration
    const formSchema = Yup.object({
        password: Yup.string()
            // Enforce reasonable minimum length for security of system.
            .min(15)
            // Set upper limit to prevent scripting attempts
            // and other attacks.
            .max(40)
            // Specify allowable characters for password.
            .matches(/[a-z]{1,}/, 'Must include at least 1 lowercase letter') // lowercase needed
            .matches(/[A-Z]{1,}/, 'Must include at least 1 uppercase.') // uppercase needed
            .matches(/[!`$%,|]{3,}/, 'Minimum 3 special characters from: !`$%,|') // special characters minimum
            // Ensure user submits a password
            .required('Required'),
        confirmPassword: Yup.string() // Make sure passwords entered match
            // Ensure user submits a password
            .required('Please enter a password')
            .oneOf([Yup.ref('password')], 'Passwords must match.') // Get the value of password and put it in
        // an array.
        // oneOf takes an array of values that this
        // field must match against      
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();

    // Function to take in the form values
    const handleSubmit = async (values) => {
        try {
            console.log('Form is submitting', values);
            // Use fetch to make a POST request
            const response = await fetch('http://localhost:5000/api/users/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token') // get local token
                },
                body: JSON.stringify({
                    password: values.password,
                    confirmPassword: values.confirmPassword
                }),
            });

            const data = await response.json();

            // If response status is not 200 it means an error
            if (!response.ok) {
                // Extract the JSON from error
                throw new Error(data.message || "Failed to update password");
            }

            // If registration was successful, navigate to the MainMenu page
            // Use the history object to navigate and pass a success message
            history.push('/profile');

        } catch (error) {
            // Log any errors to the console
            console.error('Failed to update password:', error);
        }
    };

    return (
        <Formik
            validationSchema={formSchema}
            initialValues={{
                password: '',
                confirmPassword: ''
            }}
            onSubmit={async (values) => {
                await handleSubmit(values)
            }}
        >
            {({ handleSubmit, handleChange, values, errors }) => (
                // To ensure padding on each side of page
                // wrap in a container
                // min-vh-100 ensures we use all available screen space

                //d-flex: turn all inner elements into flex items
                //flex-column: stack vertically all children
                //align-items-center: all flex items should be centered
                //noValidate: ensures the default HTML validation doesn't happen
                //                this allows us to create or use our own validation
                //               via  a 3rd party library or custom built.
                <Form noValidate onSubmit={handleSubmit} className="min-vh-100 d-flex flex-column">
                    <Container className='w-25'>
                        {/* Wrap each form entry item in a Form.Group
                                to ensure we label each form data entry
                                and its individual accesibility features properly */}
                        <Form.Group className='mb-2' controlId='password'> {/* Password initial input */}
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='confirmPassword'> {/* Password confirm input */}
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* Register button */}
                        <Button size='lg' type="submit">Update Password</Button>
                    </Container>
                </Form>
            )}
        </Formik>
    );
}
 
export default ChangePassword;