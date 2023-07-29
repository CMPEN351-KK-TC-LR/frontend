import useAuth from "./useAuth";
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { Formik } from 'formik' // for form validation
import * as Yup from 'yup'

const ReauthPage = () => {
    // Check if user is logged in
    //const { loading, currentUser } = useAuth()

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

    return (
        <Formik
            validationSchema={formSchema}
            initialValues={{
                password: '',
                confirmPassword: ''
            }}
            onSubmit={console.log}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit} className="min-vh-100 d-flex flex-column">
                    <Container className='w-25'>
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