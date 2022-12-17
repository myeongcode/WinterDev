const express = require('express');
const path = require('path');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
var db;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

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
        db.collection('counter').findOne({name : 'postCounter'}, (error, result) => {
            const totalPost = result.totalPost;

            db.collection('post').insertOne({_id : totalPost, ...req.body}, function(error, result) {
                if(error) {
                    return console.log(error);
                } 
                totalPost + 1;
                db.collection('counter').updateOne({name : 'postCounter'},{$inc : {totalPost : 1} }, function(error, result) {
                    if(error) {
                        console.log(error);
                    }
                    res.status(200).json({message : '글 게시 완료!'});
                })
            })
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


