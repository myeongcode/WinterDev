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
                {
                    props.posts.map((post, idx) => {
                        return(
                            <Cards user={props.user} key={idx} post={post} idx={idx}/>
                        )
                    })
                }
            </Box>
            <Box sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
            }}>
            </Box>
        </Box>
    )
}

export default Posts;