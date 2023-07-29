import logo from './PennStateSoft60x60.jpg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';


const CustomNavbar = () => {
    return ( 
        <Navbar bg='dark' data-bs-theme='dark' className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} className='d-inline-block align-top' width="60" height="60" alt="MSS logo" />
                </Navbar.Brand>
                <Nav className='me-auto'>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Nav className='me-auto'>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
     );
}
 
export default CustomNavbar;