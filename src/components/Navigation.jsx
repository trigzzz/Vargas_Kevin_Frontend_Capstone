import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link> | {" "}
      <Link to="/about">About</Link> | {" "}
      <Link to="/dashboard">Dashboard</Link> | {" "}
      <Link to="/login">Login</Link> | {" "}
      <Link to="/profile">Profile</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}

export default Navigation;
