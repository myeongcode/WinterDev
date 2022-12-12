import './App.css';
import React, {useEffect, useState} from 'react';
import Main from './pages/Main';
import Write from './pages/Write';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  
  const [user, setUser] = useState([{}]);

  useEffect(() => {
    axios.get('/api')
    .then((result) => {
      setUser(result?.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])



  return (
    <Container maxWidth={false} disableGutters>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={
          <Main user={user} />
        } />
        <Route path='/write' element={
          <Write user={user} />
        } />
      </Routes>
    </Container>
  )
}

export default App