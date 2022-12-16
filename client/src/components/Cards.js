import React, {useState} from 'react';
import '../scss/Cards.scss';
import {Box, Card, CardContent, Typography, CardMedia} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cards = (props) => {

    const navigate = useNavigate();

    function handleOnPath() {
        const cardURL = `/detail/${props.index}`;
        navigate(cardURL);
    }

    return (
        <Card
            variant='div'
            component='a'
            className='card-layout'
            onClick={handleOnPath}
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
                        {props.user.name}, {props.data.submitDate}
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