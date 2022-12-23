import React from 'react';
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
    <Card className='post-page-comment'>
        <Box sx={{
            display : 'flex',
            flexDirection : 'row',
            justifyContent : 'space-between'
        }}>
            <Box sx={{
                padding : '10px',
                display : 'flex',
                flexDirection : 'row',
                alignItems : 'center',
            }}>
                <Avatar />
                <Typography sx={{
                fontSize : '18px',
                fontWeight : '700',
                paddingLeft : '10px',
                paddingRight : '10px',
                whiteSpace : 'nowrap',
                }}>
                {props.user.name}
                </Typography>
                <Typography sx={{
                wordBreak : 'break-all',
                }}>{props.data.comment}</Typography>
            </Box>
            <Button onClick={handleDeleteComment} sx={{
                margin : '10px',
                color : 'red',
            }}>삭제</Button>
        </Box>
    </Card>
  )
}

export default Comments;