import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Signin from '../Signin/Signin';
import Signup from '../Signup/Signup';
import './App.css';
import Main from '../Main/Main';
import { useEffect, useState } from 'react';
import api from '../../utils/Api';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('jwt')) handleLogin();

  }, [])

  function handleLogin() {
    return api.checkTokenValidity()
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);


      })
      .catch((error) => Promise.reject(error))

  }

  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('jwt');
  }

  return (
    <div className="app">
      <Routes>

        <Route path='/' element={
          <CurrentUserContext.Provider value={currentUser || ''}>
            <Main isLogged={isLoggedIn} onLogout={handleLogout} />
          </CurrentUserContext.Provider>
        } />

        <Route path='/signin' element={<Signin onLogin={handleLogin} />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
      {/* <Signup></Signup> */}


    </div>
  );
}

export default App;
