import React, {useState} from 'react'
import '../scss/UserPage.scss';
import {Container, Box, Typography, Avatar, Card, IconButton, Button, TextField} from '@mui/material';

const UserPage = (props) => {
  return (
    <Container>
      <Box className='profile-container'>
            <Card
                component='div'
                className='profile-card'>
                <Box className='profile-box'>
                    <Box className='profile-avatar-circle'>
                        <Avatar
                            className='profile-avatar'/>
                    </Box>
                    <Typography
                        variant='h5'
                        className='profile-name-box'
                    >
                      {props.user.name}
                    </Typography>
                    <Typography
                        variant='subtitle2'
                        className='profile-explain-box'
                    >
                        {props.user.blogExplain}
                    </Typography>
                    <Box className='user-page-social'>
                        <Box className='user-page-social-box'>
                            <IconButton aria-label='github'>
                                <Avatar src='/static/images/icons/github.png' className='profile-social'/>
                            </IconButton>
                            <Typography>{props.user.githubLink}</Typography>
                        </Box>
                        <Box className='user-page-social-box'>
                            <IconButton>
                                <Avatar src='/static/images/icons/instagram.png' className='profile-social'/>
                                
                            </IconButton>
                            <Typography>{props.user.instagramLink}</Typography>
                        </Box>
                        <Box className='user-page-social-box'>
                            <IconButton>
                                <Avatar src='/static/images/icons/linkedin.png' className='profile-social'/>
                                
                            </IconButton>
                            <Typography>{props.user.linkedInLink}</Typography>
                        </Box>
                        <Box className='user-page-social-box'>
                            <IconButton>
                                <Avatar src='/static/images/icons/link.png' className='profile-social'/>
                                
                            </IconButton>
                            <Typography>{props.user.homePageLink}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    </Container>
  )
}

export default UserPage;