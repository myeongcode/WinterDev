import {Box, Typography, Container, Card, Divider, CircularProgress, Button, TextField, InputAdornment, Avatar} from '@mui/material';
import '../scss/PostPage.scss';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments';


const PostPage = (props) => {

  const {id} = useParams();
  const [realId, setRealId] = useState(null);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  
  useEffect(() => {
    axios.get('/api/post')
    .then((result) => {
      const newPostOrder = result.data.sort((a, b) => {
        return b._id - a._id;
      })
      setRealId(newPostOrder[id]._id);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [id])

  useEffect(() => {
    axios.get('/api/comment')
    .then((result) => {
      setComments(result.data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])



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

  const onChangeComment = (e) => {
    setComment(e.target.value);
  }

  const handleUpdatePost = () => {
    window.location.href = '/edit/' + realId; 
  }

  const handlePostList = () => {
    window.location.href = '/';
  }

  const handleAddComment = (e) => {
    e.preventDefault();

    const date = new Date();
    const commentDate = date.toLocaleString('ko-kr');

    const variables = {
      userid : props.user._id,
      postid : realId,
      comment : comment,
      commentDate : commentDate,
    }

    axios.post('http://localhost:8080/commentCreate', variables)
    .then((response) => {
      if(response) {
        props.handleAlertClick('success', response.data.message);
        setTimeout(() => {
          window.location.href='/detail/' + id;
        }, 2000)
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Container>
      <Box className='post-page-area'>
        <Card
          component='div'
          className='post-page-post'
        >
          { //?????? props.post[id]??? ?????? ?????????
            props.posts[id] ?
            //????????????, ??????, ????????? ????????? ?????????
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
                <Box variant='div' component='div' className='ql-editor post-page-content' dangerouslySetInnerHTML={{ __html : props.posts[id].contents }} />
              </Box>
            )
            : 
            //?????? ????????? ??????????????? Progress????????? ??????
            (
              <Typography variant='h5' align="center">
                <CircularProgress />
              </Typography>
            )
          }
        </Card>
        <Box className='post-page-buttons'>
          <Button color='success' variant='contained' onClick={handleUpdatePost}>??? ??????</Button>
          <Button variant='contained' onClick={handlePostList}>??????</Button>
          <Button color='error' variant='contained' onClick={handleDeletePost}>??? ??????</Button>
        </Box>

        <Box>
          {
            comments ?
            comments.map((data, i) => {
              if(data.postid == realId) {
                return (<Comments key={i} user={props.user} id={id} data={data} handleAlertClick={props.handleAlertClick} />)
              }
            })
            :
            (
              null
            )
          }
          
        </Box>

        <Box className='post-comment-box' >
          <TextField
          id="input-with-icon-textfield"
          onChange={onChangeComment}
          value={comment}
          size='large'
          placeholder='??????'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Avatar className='post-comment-avatar'/>
              </InputAdornment>
            ),
          }}
          variant="standard"
          className='post-comment-input'
          />
          <Button variant="contained" disableElevation onClick={handleAddComment}>??????</Button>
        
        </Box>
      </Box>
    </Container>
  )
}

export default PostPage;