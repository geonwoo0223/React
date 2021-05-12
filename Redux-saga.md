# Redux-saga

1. install redux-saga

```bash
yarn add redux-saga
```



2. store의 index.js에서 redux-saga관련 middleware 연결

```javascript
// ~/store/index.js
import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'

// dispatch와 action 사이의 middleware를 불러온다 
import rootSaga from './saga'

// 미들웨어 추가
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  // 미들웨어 적용
  applyMiddleware(sagaMiddleware)
);

// 미들웨어 실행
sagaMiddleware.run(rootSaga)

export default store
```



3. store폴더 내에 saga or sagas 폴더 생성 후 index.js 생성

```javascript
// ~/store/saga/index.js

import { all } from 'redux-saga/effects'
import { countSagas } from './countSagas'
import { accountSagas } from './accountSagas'

export default function* rootSaga() {
  yield all([...countSagas, ...accountSagas])
}
```



4. account 관련 middleware 생성

```javascript
// ~/store/saga/accountSaga.js

import ActionCreator from '../actions'

import { takeLatest, put, call } from 'redux-saga/effects';
import { login, startTrip } from '../../api/account'

export function* loginAsync() {
  try {
    const { status, data } = yield call(login)
    console.log("로그인응답", status)
    console.log("로그인데이터", data)
    yield put(ActionCreator.login())

  } catch (error) {
    console.log(error)
  }
}

export const accountSagas = [
  takeLatest('LOGIN_ASYNC', loginAsync),
]
```

> 플로우를 보면 `LOGIN_ASYNC`라는 타입의 디스패치가 발생하면, saga에서 `LOGIN_ASYNC`에 해당하는 `loginAsync`함수를 호출한다. try에서 put을 통해 action으로 다시 dispatch를 보낸다. 둘 다 dispatch를 보낸다는것에서 공통점이 있지만, 두 dispatch의 type은 항상 달라야한다.

5. axios 요청의 경우 vue에서 했던 방식이 아닌 아래와 같이 오직 요청만 return을 하고, saga에서 .then, .catch를 해결한다.

```javascript
function login() {

  return instance.get("customLogin")

}
```



### **delay**

설정된 시간 이후에 resolve하는 `Promise`객체를 리턴한다.
예시: `delay(1000)`
→ 1초 기다리기

 

### **put**

특정 액션을 dispatch하도록 한다.
예시: `put({type: 'INCREMENT]})`
→INCREAMENT action을 dispatch한다.

 

### **takeEvery**

들어오는 모든 액션에 대해 특정 작업을 처리해 준다.
예시: `takeEvery(INCREASE_ASYNC, increaseSaga)`
→들어오는 모든 INCREASE_ASYNC액션에 대해 increaseSaga 함수 실행

 

### **takeLatest**

기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다.
예시: `takeLatest(DECREASE_ASYNC, decreaseSaga)`
→DECREASE_ASYNC액션에 대해서 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업에 대해서만 decreaseSaga함수를 실행한다.

 

### **call**

함수의 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수이다.
예시: `call(delay, 1000)`
→delay(1000)함수를 call함수를 사용해서 이렇게 쓸 수도 있다.

`call`과 `put`의 다른 점은 `put`은 스토어에 인자로 들어온 action을 dispatch하고, `call`인 경우에는 주어진 함수를 실행하게 되는 것이다.

 

### **all**

`all`함수를 사용해서 제너레이터 함수를 배열의 형태로 인자로 넣어주면, 제너레이터 함수들이 병행적으로 동시에 실행되고, 전부 resolve될때까지 기다린다. `Promise.all`과 비슷하다고 보면된다.
예시: `yield all([testSaga1(), testSaga2()])`
→ testSaga1()과 testSaga2()가 동시에 실행되고, 모두 resolve될 때까지 기다린다.