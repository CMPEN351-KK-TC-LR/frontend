import { Container, Form, InputGroup, Button } from 'react-bootstrap'
import { Formik } from 'formik' // for form validation
import * as Yup from 'yup'

const Login = () => {
    // How to validate the input on front end
    const formSchema = Yup.object({
        email: Yup.string()
          .max(50, 'invalid email')
          // pattern required for valid email
          .matches(/^[a-zA-Z]+.[a-zA-Z]+@pennstatesoft.com$/)
          .required('Required'),
        password: Yup.string()
          .required('Required')
    })

    return (
        <Formik
            validationSchema={formSchema}
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={console.log}
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