import React from 'react';
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import AboutUsPage from './pages/AboutUsPage';
import Home from './pages/Home';
import WritePage from './pages/WritePage';
import NotFoundPage from './pages/NotFoundPage';
import UserPage from './pages/UserPage';
import SettingPage from './pages/SettingPage';
import BlogReadPage from './pages/BlogRead';
import TestingPage from './pages/TestingPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <>
    <Routes>
      <Route   path="/" element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/write' element={<WritePage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/about' element={<AboutUsPage/>} />
      <Route path='/search' element={<SearchPage/>} />
      <Route path='/testing' element={<TestingPage/>} />
      <Route path='/user/:username' element={<UserPage/>} />
      <Route path='/me/settings' element={<SettingPage/>}/>
      <Route path='/blog/:_id' element={<BlogReadPage/>}/>
      <Route path="/*" element={<NotFoundPage/>} />
    </Routes>
    </>
  );
}

export default App;
