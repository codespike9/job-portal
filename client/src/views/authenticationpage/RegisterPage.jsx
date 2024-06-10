import React, { useState } from 'react';
import FormInput from '../../components/form/FormInput'
import SubmitButton from '../../components/form/SubmitButton';
import Header from '../../components/header/Header';
import { Link } from 'react-router-dom';
import userAuthService from '../../services/userAuthService';
import { useAuth } from '../../contexts/AuthConetxt';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const {login,setUserData}=useAuth();
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [mobile_no, setMobileNo] = useState(Number);
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data={
      "name":name,
      "email":email,
      "mobile_no":mobile_no,
      "password":password,
      "address":address
    }
    userAuthService.userRegistration(data).then((data)=>{
      login();
      setUserData(data);
      navigate("/jobs")
    })
    console.log('Register:', { email, password });
  };

  return (
    <div >
        <Header/>
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-300 to-pink-300">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <FormInput id="name" label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <FormInput id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormInput id="mobile" label="Mobile Number" type="Number" value={mobile_no} onChange={(e) => setMobileNo(e.target.value)} />
            <FormInput id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <FormInput id="address" label="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <span className='flex'><SubmitButton label="Register" /><Link to="/login" className='bg-black w-full text-white mx-3 px-4 py-2 rounded text-center'>SignIn</Link></span>
        </form>
        </div>
    </div>
  );
};

export default RegisterPage;
