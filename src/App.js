import Navbar from './Navbar';
import AdminMeetings from './AdminMeetings';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import MainMenu from './MainMenu';
import AdminComplaints from './AdminComplaints'
import AdminMeetings from './AdminMeetings';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import UpdateBilling from './UpdateBilling';
import CreateAdmin from './CreateAdmin';
import FileComplaint from './FileComplaint';
import ManageRooms from './ManageRooms';
import ManageUsers from './ManageUser';
import Meetings from './Meetings';
import ReplyComplaint from './ReplyComplaint';

function App() {
  return (
    // Surround all App code in Router
    // So we can perform page fetching properly and routing
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/login">
               <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route path='/home'>
              <MainMenu></MainMenu>
            </Route>
            <Route path='/admin-complaints'>
              <AdminComplaints></AdminComplaints>
            </Route>
            <Route path='/admin-meetings'>
              <AdminMeetings></AdminMeetings>
            </Route>
            <Route path='/profile'>
              <Profile></Profile>
            </Route>
            <Route path='/change-password'>
              <ChangePassword></ChangePassword>
            </Route>
            <Route path='/update-billing'>
              <UpdateBilling></UpdateBilling>
            </Route>
            <Route path='/create-admin'>
              <CreateAdmin></CreateAdmin>
            </Route>
            <Route path='file-complaint'>
              <FileComplaint></FileComplaint>
            </Route>
            <Route path='/manage-rooms'>
              <ManageRooms></ManageRooms>
            </Route>
            <Route path='/manage-users'>
              <ManageUsers></ManageUsers>
            </Route>
            <Route path='/meetings'>
              <Meetings></Meetings>
            </Route>
            <Route path='/reply-complaint'>
              <ReplyComplaint></ReplyComplaint>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
