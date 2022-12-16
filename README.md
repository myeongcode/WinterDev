# blog 개인프로젝트

## 역할

## 프로젝트 진행 중 이슈
### 1. state를 props할 때의 값이 늦게 전달되어 undefined로 정의되는 문제점

```jsx
(PostPage.js)

const PostPage = (props) => {

  const {id} = useParams();

  return (
    <div>
      {props.post[id].title}
    </div>
  )
}
```

<p align="center">
    <img width="281" alt="image" src="https://user-images.githubusercontent.com/67165016/208047209-8844e574-b9eb-4638-800b-d3d719371ffb.png">
</p>

- 메인 App.js에 state를 만들고 컴포넌트로 필요한 데이터를 props해줄 때 간헐적으로 데이터값을 받아오지 못하는 문제

#### 해결한 코드
```jsx
(PostPage.js)

const PostPage = (props) => {

  const {id} = useParams();

  return (
    <div>
        {
          props?.post[id] ?
          <div>
            {props.post[id].title}
            {props.post[id].topic}
            <div dangerouslySetInnerHTML={{ __html : props.post[id].contents }} />
            
          </div>
          : <p>Loading...</p>
        }
        
    </div>
  )
}
```
