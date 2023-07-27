import CustomNavbar from './CustomNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminMeetings from './AdminMeetings';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import MainMenu from './MainMenu';
import AdminComplaints from './AdminComplaints';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import UpdateBilling from './UpdateBilling';
import CreateAdmin from './CreateAdmin';
import FileComplaint from './FileComplaint';
import ManageRooms from './ManageRooms';
import ManageUsers from './ManageUsers';
import Meetings from './Meetings';
import ReplyComplaint from './ReplyComplaint';

function App() {
    return (
        <Router>
            <CustomNavbar />
            <div className="App">
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path='/home'>
                            <MainMenu />
                        </Route>
                        <Route path='/admin-complaints'>
                            <AdminComplaints />
                        </Route>
                        <Route path='/admin-meetings'>
                            <AdminMeetings />
                        </Route>
                        <Route path='/profile'>
                            <Profile />
                        </Route>
                        <Route path='/change-password'>
                            <ChangePassword />
                        </Route>
                        <Route path='/update-billing'>
                            <UpdateBilling />
                        </Route>
                        <Route path='/create-admin'>
                            <CreateAdmin />
                        </Route>
                        <Route path='/file-complaint'>
                            <FileComplaint />
                        </Route>
                        <Route path='/manage-rooms'>
                            <ManageRooms />
                        </Route>
                        <Route path='/manage-users'>
                            <ManageUsers />
                        </Route>
                        <Route path='/meetings'>
                            <Meetings />
                        </Route>
                        <Route path='/reply-complaint'>
                            <ReplyComplaint />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;

