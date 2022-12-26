# blog 개인프로젝트

<span style="font-size : 10px; color : orange;">+ 12/24 1차 완성코드 push하였고 pagination과 이미지처리를 조금 더 파악하고 나면 추후에 수정할 예정입니다.</span>

## 프로젝트에 대한 개요
- 블로그의 기본적인 기능인 CRUD를 구현
- 웹에디터를 연결하여 이미지, 정렬, 폰트 등을 처리
- 클라이언트와 서버간 통신을 가능하게 만들며 Database에 저장되어있는 데이터들을 필요에 따라 추출
- 최신 글 순서로 업데이트 되는 블로그 글
- axios의 catch를 활용하여 server가 멈추지 않도록 예외처리


<br/>

---

## 기술스택

- HTML/CSS/JavaScript
- React.js (ver 18)
- UI Library => mui
- node.js (express)
- MongoDB
- react-quill (WebEditor)
- axios

---

## 프로세스
<p align="center">
    <img width="1280px" alt="image" src="https://user-images.githubusercontent.com/67165016/209527636-094e21e3-c874-411f-8432-993e1343f563.png">
</p>

## 컴포넌트 설명
- App.js : 메인 파일 및 Route경로 지정파일

[pages]

<p align="center">
[메인 UI]
    <img width="1280px" alt="image" src="https://user-images.githubusercontent.com/67165016/209432928-016da6a9-0d98-4c96-815b-c19003cfc66d.png">
</p>

- Home.js : 메인화면

<br/>

<p align="center">
[글 작성 UI]
    <img width="1280px" alt="image" src="https://user-images.githubusercontent.com/67165016/209433761-9fde78f3-bd83-45f7-a4b8-f55b47bde302.png">
</p>

- WritePage.js : 새로운 글을 작성하기 위한 페이지

<br/>

<p align="center">
[글 내용 UI]
    <img width="1280px" alt="image" src="https://user-images.githubusercontent.com/67165016/209433853-b613acde-d608-4e26-8de7-952e9c9693a3.png">
</p>

- PostPage.js : 작성된 글의 제목과 내용, 댓글들을 확인할 수 있는 페이지

<br/>

<p align="center">
[글 수정 UI]
    <img width="1280px" alt="image" src="https://user-images.githubusercontent.com/67165016/209433888-01853699-2559-4923-b278-416c948f2b64.png">
</p>

- UpdatePage.js : 작성된 글을 수정할 수 있는 페이지

<br/>

<p align="center">
[마이페이지 UI]
    <img width="1280px" alt="image" src="https://user-images.githubusercontent.com/67165016/209434127-755f27dd-cbad-43d8-b000-f71b63518739.png">
</p>

- UserPage.js : 사용자의 이름, 블로그 설명글, SNS링크 주소를 확인할 수 있는 페이지

<br/>

[components]

- Navbar.js : 항상 고정되어있는 상단바를 통해 메인페이지, 글 작성페이지, 마이페이지로 navigate
- Posts.js : post들의 개수와 데이터를 파악한 후 수에 맞게 Card 컴포넌트를 만들기 위한 컴포넌트
- Cards.js : post들을 카드형식으로 스타일링하여 props로 데이터를 받고 각 id에 맞는 제목, 주제, 내용, 시간을 표시하는 컴포넌트. 해당 카드를 클릭하면 id에 따라 /detail/id 페이지로 navigate
- Profile.js : 사용자의 이름, 블로그 설명글, SNS 링크 주소를 확인
- QuillEditor.js : 글을 작성할 때의 Editor를 Customizing하여 필요한 모듈들과 이미지 resize 처리하는 컴포넌트
- Comments.js : 글에 따라 댓글들을 확인할 수 있는 컴포넌트

<br/>

[server]
기본적인 CRUD 구현 코드
```js

    ...
    //글 작성시 글 count증가 및 전달받은 데이터를 post라는 collection에 저장
    app.post('/create', (req, res) => {
        db.collection('counter').findOne({name : 'postCounter'}, (error, result) => {
            const totalPost = result.totalPost;

            db.collection('post').insertOne({_id : totalPost, ...req.body}, function(error, result) {
                if(error) {
                    res.status(400).json({message : '글 게시 실패'});
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

    //글 삭제시 삭제할 데이터를 req.body로 받아 삭제
    app.delete('/delete', (req, res) => {
        req.body._id = parseInt(req.body._id);
        db.collection('post').deleteOne(req.body, (error, result) => {
            if(error) {
                return res.status(400).json({message : '삭제할 수 없습니다!'});
            }
            res.status(200).json({message : '해당 글을 삭제하였습니다!'});
        })
    })


    //글 수정시 수정될 데이터를 받고 $set Attribute로 database에 update함
    app.put('/update', (req, res) => {
        db.collection('post').updateOne({_id : req.body._id}, {$set : { title : req.body.title, topic : req.body.topic, contents : req.body.contents, submitDate : req.body.submitDate}}, (error, result) => {
            if(error) {
                return res.status(400).json({message : '수정할 수 없습니다!'});
            }
            res.status(200).json({message : '글 수정 완료!'});
        })
    })

    ...

```

---

## 코드 중 확인받고 싶은 부분
1. <h3 style="font-weight : 700;">댓글을 작성, 삭제 등을 수행한 후 랜더링 할 때의 window.location.href로 랜더링을 하는 것이 바람직한지</h3>

```jsx
(Comments.js)
...

const handleDeleteComment = (e) => {
    axios.delete('http://localhost:8080/commentDelete', {data : {
        _id : props.data._id
    }})
    .then((response) => {
        if(response) {
            props.handleAlertClick('success', response.data.message);
            setTimeout(() => {
                window.location.href='/detail/' + props.id; //댓글 작성 혹은 삭제를 클릭하였을 때 페이지 전체가 새로고침되는게 아닌 React만의 장점인 해당 부분만 재랜더링 하고싶었지만 state가 바뀌어도 랜더링되지 않아 강제적으로 재랜더링하였음.
            }, 2000)
        }
    })
    .catch((error) => {
        props.handleAlertClick('error', error.response.data.message);
    })
}

...
```

2. <h3 style="font-weight : 700;">state를 어느 위치에서 선언하는게 맞는건지</h3>
저같은 경우 모든 컴포넌트가 필요한 state(user, posts, alert)만을 메인페이지인 App.js에 선언을 했지만 PostPage, UpdatePage, WritePage에만 필요한 state들을 제가 작성한 것처럼 해당하는 곳에 위치하는게 좋은건지 모든 파일의 부모인 App.js에 모두 선언하여 props로 사용하는 것이 좋은건지 모르겠습니다..!


---

## 개발관련 과정에서 궁금했던 부분

1. <h3 style="font-weight : 700;">useEffect 사용</h3>
저는 주로 useEffect를 axios.get으로 데이터들을 가져올 때 사용을 하고있습니다.
제가 작성했던 axios처리 코드 말고도 또 들어갔으면 좋았을 코드들이 어떠한 것들이 있는지 궁금합니다.

2. <h3 style="font-weight : 700;">이미지 처리</h3>
원래는 multer 라이브러리를 사용하여 각 포스트별로 썸네일 이미지를 등록하여 카드 오른쪽부분에 표시하려했습니다.
하지만 input태그로 type은 file로 지정한 상태에서 이미지를 받아 state함수에 값을 넣었지만 state는 계속 비어있다고만 표시가 되었습니다. 콘솔로 출력할 때에는 잘 출력이 되었지만 state함수에 값을 넣고 그 state를 출력하면 값이 출력되지 않았습니다. Prototype을 보니 [Object List]라고 되어있었는데 state에는 List 자료형을 넣을 수 없는지 궁금합니다.

이외에도 아쉬운 점이나 고쳤으면 하는 부분이 있다면 어떤 말이든 말씀해주시길 바랍니다. 언제든 변화할 준비가 되어있습니다!! 감사합니다 :)
