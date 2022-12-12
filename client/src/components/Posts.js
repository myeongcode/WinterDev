import React from 'react';
import '../scss/Posts.scss';
import {Box, Typography} from '@mui/material';
import Cards from './Cards';

const Posts = (props) => {
    return(
        <Box className='post-area'>
            <Typography
                variant='h4'
                component='div'
                className='post-title'
            >
                최신글
            </Typography>
            <Box className='post-card-area'>
                <Cards user={props.user} />
                <Cards user={props.user} />
                <Cards user={props.user} />
                <Cards user={props.user} />
            </Box>
        </Box>
    )
}

export default Posts;