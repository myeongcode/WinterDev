import axios from "axios";
import { useEffect } from "react";

const post = [];

axios.get('/api/post')
.then((response) => {
    response.data.map((data, i) => {
        post[i] = data;
    })
})

const paginationService = {
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



export default paginationService;