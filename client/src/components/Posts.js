import React, { useEffect, useState } from 'react';
import '../scss/Posts.scss';
import {Box, Pagination, Typography} from '@mui/material';
import Cards from './Cards';
import usePagination from '../services/Pagination';



const Posts = (props) => {
    console.log('Posts컴포넌트 재랜더링');
    
    // const [pagination, setPagination] = useState({
    //     count : 0,
    //     from : 0,
    //     to : pageSize
    // })

    // const _DATA = usePagination(props.posts);

    // useEffect(() => {
    //     _DATA.getData({from : pagination.from, to : pagination.to})
    //     .then((response) => {
    //         setPagination({...pagination, count : response.count});
    //         props.setPosts(response.data);
    //     })
    // }, [pagination.from, pagination.to]);

    // const handlePageChange = (event, page) => {
    //     const from = (page - 1) * pageSize;
    //     const to = (page - 1) * pageSize + pageSize;

    //     setPagination({...pagination, from : from, to : to});
    // }


    

    // useEffect(() => {
    //     paginationService.getData({from : pagination.from, to : pagination.to})
    //     .then((response) => {
    //         setPagination({...pagination, count:response.count});
    //         props.setPosts(response.data);
    //     })
    // }, [pagination.from, pagination.to]);

    

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
                {/* <Pagination color='primary' /> */}
            </Box>
        </Box>
    )
}

export default Posts;