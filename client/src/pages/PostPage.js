import {Box, Typography} from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';


const PostPage = (props) => {

  const {id} = useParams();

  return (
    <Box>
        {
          props?.post[id] ?
          <div>
            {props.post[id].title}
            {props.post[id].topic}
            <div dangerouslySetInnerHTML={{ __html : props.post[id].contents }} />
            
          </div>
          : <p>Loading...</p>
        }
        
    </Box>
  )
}

export default PostPage;