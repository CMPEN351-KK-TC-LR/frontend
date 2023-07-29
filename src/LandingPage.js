import { Container, Stack, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    // Instantiate history object to redirect to
    // correct path on button click
    const history = useHistory()

    // Handler to use for both buttons
    const handleButton = (path) => {
        history.push(path)
    }

    return ( 
        <Container className="min-vh-100 d-flex flex-column">
            <Stack className="justify-content-center col-sm-3 mx-auto" gap={5}>
                <Button onClick={() => handleButton('login')} size="lg">Login</Button>
                
                <Button onClick={() => handleButton('register')} size="lg">Register</Button>
            </Stack>
        </Container>
     );
}
 
export default LandingPage;