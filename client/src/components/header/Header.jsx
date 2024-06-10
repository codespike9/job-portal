import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthConetxt';

const Header = () => {

  const {loggedIn,userData}=useAuth();
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <div className="text-2xl font-bold text-purple-700">JobSek</div>
      <nav className="flex space-x-4">
        <Link to="/" className="text-gray-600 hover:text-purple-700">Home</Link>
        <Link to="/jobs" className="text-gray-600 hover:text-purple-700">Jobs</Link>
        <Link to="/company" className="text-gray-600 hover:text-purple-700">Company</Link>
        <Link to="/career-advice" className="text-gray-600 hover:text-purple-700">Career Advice</Link>
      </nav>
      {!loggedIn?(      <div>
        <Link to="/login" className="text-purple-700 border border-purple-700 px-4 py-2 rounded mr-2">Login</Link>
        <Link to="/register" className="bg-purple-700 text-white px-4 py-2 rounded">Register</Link>
      </div>):(<div>
        Hello {userData.userName}
      </div>)
      }

    </header>
  );
};

export default Header;
