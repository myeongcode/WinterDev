import {Box, Typography, Container, Card, Divider} from '@mui/material';
import '../scss/PostPage.scss';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';


const PostPage = (props) => {

  const {id} = useParams();
  useEffect(() => {
    console.log(props);
  })

  return (
    <Container>
      <Box className='post-page-area'>
        <Card
          component='div'
          className='post-page-card'
        >
          {
            props?.post[id] ?
            <Box sx={{
              padding : '30px',
            }}>
              <Typography
                variant='subtitle2'
                className='post-page-date'
              >
                {props.post[id].submitDate}
              </Typography>
              <Typography
                variant='h3'
                className='post-page-title'
              >
                {props.post[id].title}
              </Typography>
              <Divider />
              <Box variant='div' component='div' className='post-page-content' dangerouslySetInnerHTML={{ __html : props.post[id].contents }} />
            </Box>
            : <Typography variant='h4' align="center">Loading...</Typography>
          }
        </Card>
      </Box>
    </Container>
  )
}

export default PostPage;