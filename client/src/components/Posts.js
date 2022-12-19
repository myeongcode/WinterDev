import React, { useEffect, useState } from 'react';
import '../scss/Posts.scss';
import {Box, Pagination, Typography} from '@mui/material';
import Cards from './Cards';
import axios from 'axios';
import paginationService from '../services/paginationService';

const Posts = (props) => {

    const pageSize = 4;

    const [pagination, setPagination] = useState({
        count : 0,
        from : 0,
        to : pageSize
    })

    useEffect(() => {
        paginationService.getData({from : pagination.from, to : pagination.to})
        .then((response) => {
            setPagination({...pagination, count:response.count});
            props.setPost(response.data);
        })
    }, [pagination.from, pagination.to]);

    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        
        setPagination({...pagination, from : from, to : to});
    }

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
                    props.post.map((data, i) => {
                        return(
                            <Cards user={props.user} key={i} data={data} index={i}/>
                        )
                    })
                }
            </Box>
            <Box sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
            }}>
                <Pagination count={Math.ceil(pagination.count / pageSize)} onChange={handlePageChange} color='primary' />
            </Box>
        </Box>
    )
}

export default Posts;