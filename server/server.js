const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function() {
    console.log('Server started on 8080');
})

// app.use(express.json());
// var cors = require('cors');
// app.use(cors());

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})


app.get('/api', (req, res) => {
    res.send([
        {
            "id" : 1,
            "image" : "-",
            "name" : "WooMyeonggyu",
            "birthday" : "980427",
            "gender" : "남자",
            "blogExplain" : "안녕하세요! 제 블로그에 오신 것을 환영합니다. 일상을 기록하기 위한 블로그입니다! 많이 봐주세요 :)",
            "instagramLink" : "https://www.instagram.com/woo__m_98/",
            "linkedInLink" : "https://www.linkedin.com/in/myeonggyu-woo-396068245/",
            "homePageLink" : "https://myeongcode.github.io/"
        }
    ]);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
