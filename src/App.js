import CustomNavbar from './CustomNavbar';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AdminMeetings from './AdminMeetings';
import Home from './Home';
import Login from './Login';
import Register from './Register';
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
        <BrowserRouter>
            <CustomNavbar />
            <Switch>
                {/* Only public routes */}
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                {/* Regular User routes */}
                <Route path='/profile' component={Profile}/>
                <Route path='/change-password' component={ChangePassword}/>
                <Route path='/update-billing' component={UpdateBilling}/>
                <Route path='/file-complaint' component={FileComplaint}/>
                {/* Below route is shared from User to Admin */}
                <Route path='/meetings' component={Meetings}/>
                {/* Admin routes */}
                <Route path='/admin-complaints' component={AdminComplaints}/>
                <Route path='/admin-meetings' component={AdminMeetings}/>
                <Route path='/create-admin' component={CreateAdmin}/>
                <Route path='/manage-rooms' component={ManageRooms}/>
                <Route path='/manage-users' component={ManageUsers}/>
                <Route path='/reply-complaint' component={ReplyComplaint}/>
                {/* Redirect to Home if no other paths match */}
                <Redirect to='/'/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;

