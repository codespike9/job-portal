import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput'
import SubmitButton from '../../components/form/SubmitButton'
import Header from '../../components/header/Header'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login:', { email, password });
  };

  return(
    <div >
        <Header/>
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-300 to-pink-300">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <FormInput id="email" label="Email/Mobile" type="text" value={identification} onChange={(e) => setIdentification(e.target.value)} />
            <FormInput id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className='flex'><SubmitButton label="Login" /><Link to="/register" className='bg-black w-full text-white mx-3 px-4 py-2 rounded text-center'>SignUp</Link></span>
        </form>
        </div>
    </div>

  )
};


export default LoginPage;
