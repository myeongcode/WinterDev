// import axios from "axios";
// import React, { useState, useEffect } from "react";



// const usePagination = {
//     getData: ({from, to}) => {
//         return new Promise((resolve, reject) => {

//             const data = posts.slice(from, to);

//             resolve({
//                 count : posts.length,
//                 data : data
//             })
//         });
//     }
// }

// export default usePagination;

// function usePagination(data, pageSize) {

//     const [currentPage, setCurrentPage] = useState(1);
//     const maxPage = Math.ceil(data.length / pageSize);

//     const currentData = () => {
//         const begin = (currentPage - 1) * pageSize;
//         const end = begin + pageSize;

//         return data.slice(begin, end);
//     }


//     const next = () => {
//         setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
//     }

//     const prev = () => {
//         setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
//     }

//     const jump = (page) => {
//         const pageNumber = Math.max(1, page);
//         setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
//     }

    
//     return {currentData, next, prev, jump, currentPage, maxPage};
// }




// ---

// const post = [];

// axios.get('/api/post')
// .then((response) => {
//     response.data.map((data, i) => {
//         post[i] = data;
//     })
// })

// const paginationService = {
//     getData: ({from, to}) => {
//         return new Promise((res, rej) => {
//             const data = post.slice(from, to);
//             res({
//                 count : post.length,
//                 data : data
//             })
//         })
//     }
// }