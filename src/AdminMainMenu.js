import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const AdmiMainMenu = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1>Admin Main Menu</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <p>
                        Click the button below to view all scheduled meetings.
                    </p>
                    <Link to='/admin-meetings'>
                        <Button block>See Meetings</Button>
                    </Link>

                    <p>
                        Click the button below to view all complaints that have been filed
                    </p>
                    <Link to='/admin-complaints'>
                        <Button className="mb-3" block>View Complaints</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}
 
export default AdmiMainMenu;