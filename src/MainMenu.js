import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const MainMenu = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1>Main Menu</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <p>
                        Click the button below to view meetings.
                    </p>
                    <Link to='/meetings'>
                        <Button block>See Meetings</Button>
                    </Link>

                    <p>
                        Click the button below to view all complaints that have been filed
                    </p>
                    <Link to='/file-complaints'>
                        <Button className="mb-3" block>File Complaint</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default MainMenu;