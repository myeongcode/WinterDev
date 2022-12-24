import React, { useState, useEffect } from 'react';
import '../scss/WritePost.scss';
import { Container, Box, Card, TextField, Button, FormControl } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import QuillEditor from '../components/QuillEditor';


const WritePage = (props) => {
  
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
        props.handleAlertClick('success', response.data.message);
        setTimeout(() => {
          window.location.href= '/';
        }, 2000)
      }
    })
    .catch((error) => {
      props.handleAlertClick('error', error.response.data.message);
    })
  }

  return (
    <Container>
      <Box className='write-area'>
          <Card
              component='div'
              className='write-card-area'>
              <FormControl onSubmit={onSubmit} fullWidth encType="multipart/form-data">
                <TextField className='write-content' name='title' onChange={onChangeTitle} label='글 제목' variant='outlined' />
                <TextField className='write-content' name='topic' onChange={onChangeTopic} label='글 주제' variant='outlined' />
                <QuillEditor contents={contents} setContents={setContents} />
                <Button variant='contained' onClick={onSubmit}>글 게시</Button>
              </FormControl>
          </Card>
      </Box>
    </Container>
  )
}

export default WritePage;