import React from 'react';
import '../scss/Profile.scss';
import {Box, Card, Typography, Avatar, IconButton} from '@mui/material';

const Profile = (props) => {
    return(
        <Box className='profile-container'>
            <Card
                component='div'
                className='profile-card'>
                <Box className='profile-box'>
                    <Box className='profile-avatar-circle'>
                        <Avatar
                            //UPDATE : 이미지 주소 넣을 것
                            className='profile-avatar'/>
                    </Box>
                    <Typography
                        variant='h5'
                        className='profile-name-box'
                    >
                        {props.user[0].name}
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        className='profile-explain-box'
                    >
                        {props.user[0].blogExplain}
                    </Typography>
                    <Box className='profile-social-box'>
                        <>
                            <IconButton aria-label='github' href={props.user[0].githubLink}>
                                <Avatar src='/static/images/icons/github.png' sx={{
                                    boxShadow : '0px 0px 10px gray'
                                }} />
                            </IconButton>
                        </>
                        <>
                            <IconButton href={props.user[0].instagramLink}>
                                <Avatar src='/static/images/icons/instagram.png' className='profile-social'/>
                            </IconButton>
                        </>
                        <>
                            <IconButton href={props.user[0].linkedInLink}>
                                <Avatar src='/static/images/icons/linkedin.png' className='profile-social'/>
                            </IconButton>
                        </>
                        <>
                            <IconButton href={props.user[0].homePageLink}>
                                <Avatar src='/static/images/icons/link.png' className='profile-social'/>
                            </IconButton>
                        </>
                    </Box>
                    
                </Box>
                
            </Card>
        </Box>
    )
}

export default Profile;