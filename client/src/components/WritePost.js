import React from 'react';
import { Box, Card, Typography, TextField } from '@mui/material';

const WritePost = (props) => {
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
            
            <TextField fullWidth label='글 제목' variant='outlined' />
            
        </Card>
    </Box>
  )
}

export default WritePost;