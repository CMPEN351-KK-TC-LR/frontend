import logo from './PennStateSoft60x60.jpg';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';
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
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/profile">Profile</NavLink>
                        <NavLink href='/logout'>Logout</NavLink>
                        </>
                    ) : (
                        <>
                        <NavLink className='ms-auto' href="/login">Login</NavLink>
                        <NavLink className='ms-auto' href='/register'>Register</NavLink>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
     );
}
 
export default CustomNavbar;