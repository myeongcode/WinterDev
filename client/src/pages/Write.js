import React, {useState} from 'react';
import {Container, Grid } from '@mui/material';
import Profile from '../components/Profile';
import WritePost from '../components/WritePost';

const Write = (props) => {

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={9}>
            <WritePost handleOnAlert={props.handleOnAlert}/>
        </Grid>
        <Grid item xs={3}>
            <Profile user={props.user} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Write;