import { useHistory } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap';

const MainMenu = () => {
    const history = useHistory()

    const handleBtnClick = (path) => {
        history.push(path)
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col className="text-center">
                    <h1>Main Menu</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Button className="mb-3 mx-2" onClick={() => handleBtnClick('/meetings')}>Meetings</Button>
                    <Button className="mb-3 mx-2" onClick={() => handleBtnClick('/profile')}>Profile</Button>
                    <Button className="mb-3 mx-2" onClick={() => handleBtnClick('/file-complaint')}>File Complaint</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MainMenu;