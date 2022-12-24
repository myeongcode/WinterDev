import React from 'react';
import {Container, Grid, Typography, CircularProgress} from '@mui/material';
import Posts from '../components/Posts';
import Profile from '../components/Profile';

const Home = (props) => {

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          {
            //posts가 0개보다 많으면
            props.posts.length >= 0 ?
            (
              //props된 posts들을 보여주세요
              <Posts user={props.user} posts={props.posts} setPosts={props.setPosts}  />
            )
            : //posts가 0개보다 적으면
            (
              //로딩중을 띄워주세요
              <Typography variant='h5' align="center">
                <CircularProgress />
              </Typography>
            )
          }
        </Grid>
        <Grid item xs={3}>
            <Profile user={props.user} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;