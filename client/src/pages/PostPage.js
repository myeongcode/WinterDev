import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PostPage = () => {

  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/post')
    .then((result) => {
      setData(result.data);
      console.log(result);
    })
  })

  return (
    <div>
        {data}
    </div>
  )
}

export default PostPage;