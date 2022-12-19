import React, { useEffect, useState } from 'react';
import '../scss/WritePost.scss';
import { Box, Card, Typography, TextField, Button, FormControl, Alert } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import QuillEditor from './QuillEditor';


const WritePost = (props) => {
  
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeTopic = (e) => {
    setTopic(e.target.value);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const submitDate = date.toLocaleString('ko-kr');
    
    const variables = {
      title : title,
      topic : topic,
      contents : contents,
      submitDate : submitDate,
    }
    
    axios.post('http://localhost:8080/create', variables)
    .then((response) => {
      if(response) {
        props.handleOnAlert('success', response.data.message);
        setTimeout(() => {
          window.location.href= '/';
        }, 2000)
      }
      
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <Box className='write-area'>
        <Card
            component='div'
            className='write-card-area'>
            <FormControl onSubmit={onSubmit} fullWidth>
              <TextField className='write-content' name='title' onChange={onChangeTitle} label='글 제목' variant='outlined' />
              <TextField className='write-content' name='topic' onChange={onChangeTopic} label='글 주제' variant='outlined' />
              <QuillEditor contents={contents} setContents={setContents} />
              <Button variant='contained' onClick={onSubmit}>글 게시</Button>
            </FormControl>
        </Card>
    </Box>
  )
}

export default WritePost;