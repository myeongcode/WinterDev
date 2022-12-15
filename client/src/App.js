import './App.css';
import React, {useEffect, useState} from 'react';
import Main from './pages/Main';
import Write from './pages/Write';
import PostPage from './pages/PostPage';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';


const App = () => {
  
  const [user, setUser] = useState([{}]);
  const [post, setPost] = useState([{}]);

  useEffect(() => {
    axios.get('/api/user')
    .then((result) => {
      setUser(result.data);
    })
    .catch((error) => {
      console.log(error);
    })

    axios.get('/api/post')
    .then((result) => {
      setPost(result.data);
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
          <Main user={user} post={post} />
        } />
        <Route path='/write' element={
          <Write user={user} />
        } />
        <Route path='/detail' element={
          <PostPage />
        } />
      </Routes>
    </Container>
  )
}

export default App