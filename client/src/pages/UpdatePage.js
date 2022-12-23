import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../scss/WritePost.scss';
import { Container, Box, Card, TextField, Button, FormControl } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import QuillEditor from '../components/QuillEditor';

const UpdatePage = (props) => {

  const location = useLocation();
  const editId = parseInt(location.pathname.split('/')[2]);
  
  const [arrayId, setArrayId] = useState({});
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  

  useEffect(() => {
    axios.get('/api/post')
    .then((response) => {
      response.data.map((editpost, idx) => {
        if(editpost._id == editId) {
          setArrayId(idx);
          setTitle(editpost.title);
          setTopic(editpost.topic);
          setContents(editpost.contents);
        }
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

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
        _id : editId,
        title : title,
        topic : topic,
        contents : contents,
        submitDate : `${submitDate} (수정됨)`,
      }

      
      axios.put('http://localhost:8080/update', variables)
      .then((response) => {
        props.handleAlertClick('success', response.data.message);
        setTimeout(() => {
          window.location.href='/detail/' + arrayId;
        }, 2000);
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
                    <FormControl onSubmit={onSubmit} fullWidth>
                        <TextField value={title} className='write-content' name='title' onChange={onChangeTitle} label='글 제목' variant='outlined' />
                        <TextField value={topic} className='write-content' name='topic' onChange={onChangeTopic} label='글 주제' variant='outlined' />
                        <QuillEditor contents={contents} setContents={setContents} />
                        <Button variant='contained' onClick={onSubmit}>글 수정</Button>
                    </FormControl>
                </Card>
            </Box>
        </Container>
    )
}

export default UpdatePage;
