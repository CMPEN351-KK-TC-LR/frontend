import { useHistory } from 'react-router-dom'
import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { Formik } from 'formik' // for form validation
import * as Yup from 'yup'
import useAuth from './useAuth'

const Login = () => {
    const history = useHistory();
    const { login } = useAuth();

    // How to validate the input on front end
    const formSchema = Yup.object({
        email: Yup.string()
          .max(50, 'invalid email')
          // pattern required for valid email
          .matches(/^[a-zA-Z1-9]+.[a-zA-Z1-9]+@pennstatesoft.com$/)
          .required('Required'),
        password: Yup.string()
          .required('Required')
    })

    const handleSubmit = async (values) => {
        try {
            // Use fetch to make a POST request
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });

            // If response status is not 200 it means an error
            if (!response.ok) {
                // Extract the JSON from error
                const errorData = await response.json();
                // Throw an error with the error data message
                throw new Error(errorData);
            }

            // Get the response data (token and user data)
            const data = await response.json();

            login(data);

            // If login was successful, navigate to the home page
            history.push('/');
        } catch (error) {
            // Log any errors to the console
            console.error('Failed to login:', error);
        }
    };

    return (
        <Formik
            validationSchema={formSchema}
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Container className="min-vh-100">
                    <Form noValidate onSubmit={handleSubmit} className="min-vh-100 d-flex flex-column align-items-center">
                        <Form.Group md={4}>
                            {/* Email entry */}
                            <Form.Group className='mb-4' controlId='email'>
                                <Form.Label className=''>Email address</Form.Label>
                                <InputGroup size='lg'>
                                    <Form.Control
                                        name='email'
                                        type="email"
                                        placeholder='Email here'
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                </InputGroup>    
                            </Form.Group>
                            {/* Password entry */}
                            <Form.Group className='mb-3' controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <InputGroup size='lg'>
                                    <Form.Control
                                        name='password'
                                        type="password"
                                        placeholder='Password'
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                </InputGroup>    
                            </Form.Group>
                            {/* Login button */}
                            <Button size='lg' type="submit">Login</Button>
                        </Form.Group>
                    </Form>
                </Container>
            )}
        </Formik>
     );
}
 
export default Login;