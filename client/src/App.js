import './App.css';
import React, {useEffect, useState} from 'react';
import Main from './pages/Main';
import Write from './pages/Write';
import PostPage from './pages/PostPage';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Container, Alert } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { textAlign } from '@mui/system';


const App = () => {
  
  const [user, setUser] = useState([{}]);
  const [post, setPost] = useState([{}]);
  const [alert, setAlert] = useState({});

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
      
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  const handleOnAlert = (severity, message) => {
    setAlert({severity : severity, message : message});
    document.querySelector('.write-alert').style.display = 'flex';
    setTimeout(() => {
      document.querySelector('.write-alert').style.display = 'none';
    }, 1000)
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Navbar user={user} />
      <Alert className='write-alert' severity={alert.severity}
        sx = {{
        position : 'absolute',
        left : '0',
        right : '0',
        top : '100px',
        marginLeft : 'auto',
        marginRight : 'auto',
        width : '200px',
        display : 'none',
      }}
      >{alert.message}</Alert>
      <Routes>
        <Route path='/' element={
          <Main user={user} post={post} setPost={setPost}/>
        } />
        <Route path='/write' element={
          <Write user={user} handleOnAlert={handleOnAlert}/>
        } />
        <Route path='/detail/:id' element={
          <PostPage post={post} />
        } />
      </Routes>
    </Container>
  )
}

export default App