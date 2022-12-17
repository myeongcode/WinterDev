import axios from "axios";

const post = [];

axios.get('/api/post')
.then((response) => {
    response.data.map((data, i) => {
        post[i] = data;
    })
}, [])

const service = {
    getData: ({from, to}) => {
        return new Promise((res, rej) => {
            const data = post.slice(from, to);
            res({
                count : post.length,
                data : data
            })
        })
    }
}



export default service;