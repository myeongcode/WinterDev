import React from 'react';
import {Container, Grid} from '@mui/material';
import Posts from '../components/Posts';
import Profile from '../components/Profile';

const Main = (props) => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={9}>
            <Posts user={props.user} post={props.post} setPost={props.setPost} />
        </Grid>
        <Grid item xs={3}>
            <Profile user={props.user} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Main;