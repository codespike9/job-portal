import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [userName,setUserName]=useState('');
  // const [userEmail,setUserEmail]=useState('')
  // const [userMobile_no,setUserMobile]=useState('')
  const [userData,setUser]=useState({})

  const login = () => {
    setLoggedIn(true);
  };

  const setUserData=(data)=>{
    // setUserName(data.username)
    // setUserEmail(data.email)
    // setUserMobile(data.mobile_no)
    var userData={
      userName:data.username,
      userEmail:data.email,
      userMobile_no:data.mobile_no
    }
    setUser(userData)
  }
  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem('idToken');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout,setUserData,userData }}>
      {children}
    </AuthContext.Provider>
  );
};
