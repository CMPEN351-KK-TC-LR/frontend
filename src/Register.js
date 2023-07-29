import { Container, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik' // for form validation
import * as Yup from 'yup'

const Register = () => {
    // How to validate the input on front end for registration
    const formSchema = Yup.object({
        email: Yup.string()
            .min(21, 'Invalid email')
            .max(50, 'Invalid email')
            // pattern required for valid email
            .matches(/^[a-zA-Z]{1,15}\.[a-zA-Z]{1,16}/,
                'Invalid email.') // first.last
            .matches(/@pennstatesoft.com$/, 'Must use your company email.') // must end with appropriate email domain
            .required('Must provide an email.'),
        name: Yup.string()
            // Set min to allow user entering initials
            // followed by period and space separating.
            .min(5)
            // Set max to a reasonable limit.
            // Unfortunately this will not allow
            // specifying hyphenated names and
            // will force some long last/first
            // name people to choose between their
            // first and last name while using initials
            // for their other name.
            .max(30)
            // Ensure only names are entered with
            // optional period for initials
            // and space separating first and last
            .matches(/^[A-Z.a-z]+ [A-Z.a-z]+$/, 'Please specify your full name.')
            .required('Must specify your full name.'),
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

    return ( 
        <Formik
            validationSchema={formSchema}
            initialValues={{
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={console.log}
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
                            <Form.Group className='mb-2' controlId='name'> {/* Full name input */}
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="John Smith"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-2' controlId='email'> {/* Email input */}
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="aa.milne@pennstatesoft.com"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
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
                            {/* Register button */}
                            <Button size='lg' type="submit">Submit</Button>
                        </Container>
                    </Form>
            )}
        </Formik>
     );
}
 
export default Register;