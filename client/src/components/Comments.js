import React from 'react';
import '../scss/Comments.scss';
import {Box, Typography, Card, Avatar, Button} from '@mui/material';
import axios from 'axios';

const Comments = (props) => {

    const handleDeleteComment = (e) => {
        axios.delete('http://localhost:8080/commentDelete', {data : {
            _id : props.data._id
        }})
        .then((response) => {
            if(response) {
                props.handleAlertClick('success', response.data.message);
                setTimeout(() => {
                    window.location.href='/detail/' + props.id;
                }, 2000)
            }
        })
        .catch((error) => {
            props.handleAlertClick('error', error.response.data.message);
        })
    }

  return (
    <Card className='comment-card'>
        <Box className='comment-container'>
            <Box className='comment-content'>
                <Avatar />
                <Typography className='comment-username'>
                {props.user.name}
                </Typography>
                <Typography className='comment-text'>{props.data.comment}</Typography><Typography sx={{ display:'flex', fontSize : '12px', margin : '10px', color : 'lightgray', fontWeight : '200'}}>{props.data.commentDate}</Typography>
            </Box>
            <Button className='comment-btn' onClick={handleDeleteComment}>삭제</Button>
        </Box>
    </Card>
  )
}

export default Comments;