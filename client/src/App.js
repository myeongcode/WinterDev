import './App.css';
import React, {useEffect, useState} from 'react';
import PostPage from './pages/PostPage';
import Home from './pages/Home';
import WritePage from './pages/WritePage';
import UserPage from './pages/UserPage';
import UpdatePage from './pages/UpdatePage';
import Navbar from './components/Navbar';
import axios from 'axios';
import { Container, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Routes, Route } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const App = () => {

  const [imgContent, setImgContents] = useState('');
  const [uploadedImg, setUploadedImg] = useState({
    fileName : '',
    filePath : ''
  })
  
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({});


  useEffect(() => {
    axios.get('/api/user')
    .then((result) => {
      setUser(result.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  useEffect(() => {
    axios.get('/api/post')
    .then((result) => {
      const newPostOrder = result.data.sort((a, b) => {
        return b._id - a._id;
      })
      setPosts(newPostOrder);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
  


  const handleAlertClick = (severity, message) => {
    setAlertMessage({
      severity: severity,
      message : message
    })
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };
  

  return (
    <Container maxWidth={false} disableGutters>

      <Navbar user={user} />

      <Snackbar open={alertOpen} autoHideDuration={1800} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertMessage.severity} sx={{ width: '100%' }}>
          {alertMessage.message}
        </Alert>
      </Snackbar>

      <Routes>
        <Route path='/' element={
          <Home posts={posts} user={user} setPosts={setPosts} />
        } />
        <Route path='/write' element={
          <WritePage handleAlertClick={handleAlertClick} />
        } />
        <Route path='/detail/:id' element={
          <PostPage posts={posts} handleAlertClick={handleAlertClick} user={user} />
        } />
        <Route path='/edit/:id' element={
          <UpdatePage handleAlertClick={handleAlertClick}/>
        } />
        <Route path='/profile' element={
          <UserPage user={user} handleAlertClick={handleAlertClick}/>
        } />
      </Routes>

    </Container>
  )
}

export default App