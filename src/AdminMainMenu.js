import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AdmiMainMenu = () => {
    // Allow redirects
    const history = useHistory()

    // redirect to correct path
    const handleClick = (path) => {
        history.push(path)
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1>Admin Main Menu</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Button className="mb-3 mx-2" onClick={() => handleClick('/admin-meetings')}>See Meetings</Button>
                    <Button className="mb-3 mx-2" onClick={() => handleClick('/admin-complaints')}>View Complaints</Button>
                    <Button className="mb-3 mx-2" onClick={() => handleClick('/create-admin')}>Create Admin Account</Button>
                </Col>
                <Col md={{ span: 6, offset: 3 }}>
                    <Button className="mb-3 mx-2" onClick={() => handleClick('/manage-users')}>Manage Users</Button>
                    <Button className="mb-3 mx-2" onClick={() => handleClick('/manage-rooms')}>Manage Rooms</Button>
                    <Button className="mb-3 mx-2" onClick={() => handleClick('/profile')}>Profile</Button>
                </Col>
            </Row>
        </Container>
    );
}
 
export default AdmiMainMenu;