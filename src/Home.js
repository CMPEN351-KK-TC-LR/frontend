import useAuth from './useAuth';
import LandingPage from './LandingPage'
import AdminMainMenu from './AdminMainMenu'
import MainMenu from './MainMenu'

const Home = () => {
    // Get current user data
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // Choose which page to return based on
    // if user authenticated and their account level

    // If there is no logged-in user, show the LandingPage
    if (!currentUser) {
        return <LandingPage />;
    }

    // If the user is an admin, show the AdminMainMenu
    if (currentUser.admin) {
        return <AdminMainMenu />;
    }

    // If the user is a client, show the MainMenu
    return <MainMenu />;
}

export default Home;