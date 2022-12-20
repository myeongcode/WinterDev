import {Box, Typography, Container, Card, Divider, CircularProgress, Button} from '@mui/material';
import '../scss/PostPage.scss';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UpdatePage from './UpdatePage';


const PostPage = (props) => {
  console.log('PostPage 재렌더링');

  const {id} = useParams();
  const [realId, setRealId] = useState(null);
  

  
  useEffect(() => {
    axios.get('/api/post')
    .then((result) => {
      setRealId(result.data[id]._id);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [id])

  

  const handleDeletePost = () => {
    axios.delete('http://localhost:8080/delete', {data : {
      _id : realId
    }})
    .then((response) => {
      props.handleAlertClick('success', response.data.message);
      setTimeout(() => {
        window.location.href= '/';
      }, 2000)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleUpdatePost = () => {
    window.location.href = '/edit/' + realId; 
  }

  return (
    <Container>
      <Box className='post-page-area'>
        <Card
          component='div'
          className='post-page-card'
        >
          { //만약 props.post[id]의 값이 있으면
            props.posts[id] ?
            //게시날짜, 제목, 본문의 내용을 보여줌
            (
              <Box sx={{
                padding : '30px',
              }}>
                <Typography
                  variant='subtitle2'
                  className='post-page-date'
                >
                  {props.posts[id].submitDate}
                </Typography>
                <Typography
                  variant='h3'
                  className='post-page-title'
                >
                  {props.posts[id].title}
                </Typography>
                <Divider />
                <Box variant='div' component='div' className='post-page-content' dangerouslySetInnerHTML={{ __html : props.posts[id].contents }} />
              </Box>
            )
            : 
            //값이 없으면 로딩상태인 Progress화면을 표시
            (
              <Typography variant='h5' align="center">
                <CircularProgress />
              </Typography>
            )
          }
        </Card>
        <Box sx={{
          paddingTop : '20px',
          paddingBottom : '20px',
          display : 'flex',
          justifyContent : 'space-between',
        }}>
          <Button color='success' variant='contained' onClick={handleUpdatePost}>글 수정</Button>
          <Button color='error' variant='contained' onClick={handleDeletePost}>글 삭제</Button>
        </Box>
      </Box>
    </Container>
  )
}

export default PostPage;