import useAuth from "./useAuth";
import { Container, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik' // for form validation
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import { useState } from "react";

const ReauthPage = ({ updateJwt }) => {
    // Check if user is logged in
    const { loading, currentUser } = useAuth()
    const [ authed, setAuthed ] = useState(false)
    // Allow redirecting
    const history = useHistory()

    // How to validate the input on front end for registration
    const formSchema = Yup.object({
        password: Yup.string()
            // No min/max because already auth'ed and they know their PW
            // Ensure user submits a password
            .required('Enter your password'),
        confirmPassword: Yup.string() // Make sure passwords entered match
            // Ensure user submits a password
            .required('Please confirm your password.')
            .oneOf([Yup.ref('password')], 'Passwords don\'t match.') // Get the value of password and put it in
                                          // an array.
                                          // oneOf takes an array of values that this
                                          // field must match against      
    })
    const jsonDataFormat = 'application/json'

    return (
        <Formik
            validationSchema={formSchema}
            initialValues={{
                password: '',
                confirmPassword: ''
            }}
            // What to do when form is validated to submit it to back-end
            onSubmit={async (values) => {
                try {
                    fetch('/api/users/auth', {
                        method: 'POST',
                        headers: {
                            'Accept': jsonDataFormat,
                            'Content-Type': jsonDataFormat,
                            'x-access-token': localStorage.getItem('token') // get cached token
                        },
                        // Send password to back-end with current user information
                        // including their user ID to have backend-check password
                        body: JSON.stringify(Object.assign(values, currentUser))
                    })
                    .then((res) => { // Check return of fetch
                        if (res.ok) { // Return successfully
                            return res.json()
                        }
                        // Else
                        throw Error('Unable to authenticate')
                    })
                    .then((res) => { // Do something with return from .then above
                        setAuthed(true) // We authenticated successfully
                        // Update auth JWT with returned token in header
                        updateJwt(res.headers.get("x-auth-token"))
                    })
                    .catch((e) => { // Handle errors
                        // Redirect to last page, to fail safe
                        history.goBack()
                    })
                } catch (e) {
                    // Put an error message at end of form
                    console.error(e)
                }
                return { authed }
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className="min-vh-100 d-flex flex-column">
                    <Container id='pw-reauth' className='w-25'>
                        {/* Wrap each form entry item in a Form.Group
                            to ensure we label each form data entry
                            and its individual accesibility features properly */}
                        <Form.Group className='mb-2' controlId='password'> {/* Password initial input */}
                            <Form.Label>Password</Form.Label>
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
                        {/* Submit button */}
                        <Button size='lg' type="submit">Submit</Button>
                    </Container>
                </Form>
            )}
        </Formik>
    );
}

export default ReauthPage;