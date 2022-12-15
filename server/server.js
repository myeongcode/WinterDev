const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
//const mongoose = require('mongoose');
var cors = require('cors');
var db;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

// mongoose.set('strictQuery', false);

// mongoose.connect('mongodb+srv://admin:admin@cluster0.oymstvd.mongodb.net/?retryWrites=true&w=majority', (error) => {
//     if(!error) {
//         console.log('Database connected');
//     } else {
//         console.log(error);
//     }
// });

// const mongooseDB = mongoose.connection;

// mongooseDB.on('err', (err) => {
//     console.log('DB error : ', error);
// })
// mongooseDB.once('open', () => {
//     console.log('Connected to DB');
// })

// const userSchema = new mongoose.Schema({
//   name : String,
//   gender : String,
//   blogExplain : String,
//   instagramLink : String,
//   linkedInLink : String,
//   homePageLink : String
// });

// const userModel = mongoose.model('user', userSchema);

// const user = new userModel(
//     {
//     name : "WooMyeonggyu",
//     gender : "남자",
//     blogExplain : "안녕하세요! 제 블로그에 오신 것을 환영합니다. 일상을 기록하기 위한 블로그입니다! 많이 봐주세요 :)",
//     instagramLink : "https://www.instagram.com/woo__m_98/",
//     linkedInLink : "https://www.linkedin.com/in/myeonggyu-woo-396068245/",
//     homePageLink : "https://myeongcode.github.io/"
//     }
// );

MongoClient.connect('mongodb+srv://admin:admin@cluster0.oymstvd.mongodb.net/?retryWrites=true&w=majority', function(error, client) {
    if(error) {
        return console.log(error);
    }

    //8080 port로 웹서버를 열고 잘 열리면 'listening on 8080'이라고 콘솔에 출력해주세요
    app.listen(8080, function() {
        console.log('listening on 8080');
    });

    db = client.db('blogapp');
    
    //누군가가 메인페이지로 get요청을 하면 리액트에서 준비해둔 파일로 출력해주세요
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })

    //누군가가 /create경로로 post요청을 하면 데이터베이스의 post인 콜렉션에 결과값을 저장해주세요
    app.post('/create', (req, res) => {
        db.collection('post').insertOne(req.body, (result, error) => {
            if(error) {
                return console.log(error);
            }
            console.log(result);
        })
    })


    //user의 데이터가 담겨있는 곳
    app.get('/api/user', (req, res) => {
        db.collection('user').find().toArray((error, result) => {
            res.send(result[0]);
        })
    })

    //post의 데이터가 담겨있는 곳
    app.get('/api/post', (req, res) => {
        db.collection('post').find().toArray((error ,result) => {
            res.send(result);
        })
    })
    
    


    //누군가 다른 경로로 get요청을 하면 알아서 라우팅해주세요
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })

})


