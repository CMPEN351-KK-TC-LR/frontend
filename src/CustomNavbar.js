import logo from './PennStateSoft60x60.jpg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import useAuth from './useAuth';

const loggedInNavbar = () => {
    
}

const CustomNavbar = () => {
    // Use the useAuth hook to get the current user
    const { loading , currentUser } = useAuth();

    
    return ( 
        <Navbar bg='dark' data-bs-theme='dark' className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} className='d-inline-block align-top' width="60" height="60" alt="MSS logo" />
                </Navbar.Brand>
                <Nav className={currentUser ? 'me-auto' : 'ms-auto' }>
                    {currentUser ? (
                        <>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href='/logout'>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                        <Nav.Link className='ms-auto' href="/login">Login</Nav.Link>
                        <Nav.Link className='ms-auto' href='/register'>Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
     );
}
 
export default CustomNavbar;