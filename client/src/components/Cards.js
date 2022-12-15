import React from 'react';
import '../scss/Cards.scss';
import {Box, Card, CardContent, Typography, CardMedia} from '@mui/material';

const Cards = (props) => {
    return (
        <Card
            variant='div'
            component='a'
            href='/'
            className='card-layout'
            >
            <Box className='card-contents-box'>
                <CardContent>
                    <Typography
                        variant='h6' 
                        component='div' 
                        className='card-post-title'
                    >
                        {props.data.title}
                    </Typography>
                    <Typography 
                        variant='subtitle1' 
                        component='div' 
                        className='card-post-subtitle'
                    >
                        {props.data.topic}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography variant='p' component='div' className='card-post-inform'>
                        {props.user.name}, 2022년 12월 10일 10:50pm
                    </Typography>
                    
                </CardContent>
            </Box>
            <CardMedia 
                component='img'
                className='card-post-media'
                src='/static/images/postImages/sea.jpg'
            />
        </Card>
    )
}

export default Cards;