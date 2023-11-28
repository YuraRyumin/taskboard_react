import React, {createContext, useContext, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RolePage } from './pages/RolePage';
import { TaskPage } from './pages/TaskPage';
import { UserPage } from './pages/UserPage';

function App() {
  return(
    <>
    <Navigation />
    <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/tasks' element={<TaskPage />}/>
      <Route path='/roles' element={<RolePage />}/>
      <Route path='/users' element={<UserPage />}/>
      <Route path='/about' element={<AboutPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/registration' element={<RegistrationPage />}/>
    </Routes>
    </>
  );
}

export default App;
