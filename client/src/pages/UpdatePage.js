import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../scss/WritePost.scss';
import { Container, Box, Card, TextField, Button, FormControl } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import QuillEditor from '../components/QuillEditor';

const UpdatePage = (props) => {

    // useEffect(() => {
    //     axios.get('/edit/:id')
    //     .then((response) => {
    //         console.log(response);
    //     })
    // }, [])

    const location = useLocation();
    const editId = parseInt(location.pathname.split('/')[2]);

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

    }



    return (
        <Container>
            <Box className='write-area'>
                <Card
                    component='div'
                    className='write-card-area'>
                    <FormControl onSubmit={onSubmit} fullWidth>
                        <TextField className='write-content' name='title' onChange={onChangeTitle} label='글 제목' variant='outlined' />
                        <TextField className='write-content' name='topic' onChange={onChangeTopic} label='글 주제' variant='outlined' />
                        <QuillEditor contents={contents} setContents={setContents} />
                        <Button variant='contained' onClick={onSubmit}>글 수정</Button>
                    </FormControl>
                </Card>
            </Box>
        </Container>
    )
}

export default UpdatePage;
