import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const AdmiMainMenu = () => {
    return (
        <div>
            <Link to='/admin-complaints'>
                <Button>View Complaints</Button>
            </Link>
        </div>
    );
}
 
export default AdmiMainMenu;