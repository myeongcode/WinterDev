import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, FormControl } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';


const WritePost = () => {
  
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");

  const onChangeContents = (text) => {
    setContents(text);
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeTopic = (e) => {
    setTopic(e.target.value);
  }
  
  const onSubmit = (e) => {
    e.preventDefault();

    setContents("");
    setTitle("");
    setTopic("");

    const variables = {
      title : title,
      topic : topic,
      contents : contents
    }

    axios.post('http://localhost:8080/create', variables)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
  

}

  

  return (
    <Box sx={{
        boxSizing : 'border-box',
        padding : '10px',
        width : '100%',
        height : '1100px',
    }}>
        <Card
            component='div'
            sx={{
                boxSizing : 'border-box',
                padding : '20px',
                width : '100%',
                height : '100%',
                borderRadius : '10px',
                boxShadow : '0px 0px 5px gray'
        }}>
            <FormControl onSubmit={onSubmit}>
              <TextField name='title' onChange={onChangeTitle} fullWidth label='글 제목' variant='outlined' />
              <TextField name='topic' onChange={onChangeTopic} fullWidth label='글 주제' variant='outlined' />
              <ReactQuill value={contents} onChange={onChangeContents}/>
              <Button variant='contained' onClick={onSubmit}>버튼</Button>
            </FormControl>
            {/* <div dangerouslySetInnerHTML={{__html : contents}} /> */}
        </Card>
    </Box>
  )
}

export default WritePost;