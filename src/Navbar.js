import logo from './PennStateSoft-logos.jpeg';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <img src={logo} alt="MSS logo" />
            <h1>Meeting Scheduling System</h1>
            <a href="/">Home</a>
        </nav>
     );
}
 
export default Navbar;