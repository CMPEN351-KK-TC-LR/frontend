import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from './useAuth'

const Logout = () => {
    // To redirect with
    const history = useHistory()

    // Erase local copy of token
    localStorage.setItem('token', null)

    // Get current user data
    const { currentUser, loading } = useAuth();

    // Redirect to Home
    history.push('/')
}

export default Logout;