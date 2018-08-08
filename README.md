### npm install
### npm start
### index.js-入口。包含井字棋练习
### reduxTest.js-- redux-Demo

根据https://doc.react-china.org/tutorial/tutorial.html
做了一个简易版的井字棋游戏
记录学习内容：


1. React是一种  声明式   高效 灵活 构建用户界面的框架

2. 组件 ：React.Component{}

3. 组件是接受 名为 props的参数 {this.props.name}， 即 当前组件被应用时， 传入的各个数据，包括事件等；

4.render返回的是一个React元素 ：渲染内容的描述   一般使用JSX语法来扩展  ： <div /> -----> React.createElement("div")

5.通过 <ShoppingList /> 这样的标签你就可以在 React 当中调用整个 ShoppingList 组件

6. 添加样式用  className = "aaaa",  事件： onClick={ () => alert("click")}

7.  this.state 为自身设置自身的状态数据，  存储变化的数据

8. this.setState 用于设置 值 ，每次触发时都会开始准备更新组件 跟随数据改变了的内容。

状态提升：

9.  子组件的state数据提升至共同的 父组件 中保存。然后 父组件 通过Props  将 状态 数据传递到子组件中     ------>  方便状态数据共享交流

10.  key React当中使用的一种特殊的属性，(以及ref属性)，无法通过props获取到key，React会自动判断元素更新时使用key，而组件自己无法获取到key的。
组件key值被改变就会被当作新创建的组件处理。 
组件的 keys 值并不需要在全局都保证唯一，只需要在当前的节点里保证唯一即可


二.Redux
概念：
（1）Web 应用是一个状态机，视图与状态是一一对应的。

（2）所有的状态，保存在一个对象里面。

Store:
保存数据的地方，看成一个容器， 整个应用只能有一个store

提供的方法函数： createStore，用于生成store，接受了另一个函数参数，返回新生成的store对象
例：import { createStore } from 'redux';
   const store = createStore(fn);
State：
时点的数据集合叫做 State， 如，当前时刻的 State，通过 store.getState() 拿到
import { createStore } from 'redux';
const store = createStore(fn);
const state = store.getState();
Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。


Action：
Action 就是 View 发出的通知，表示 State 应该要发生变化了
Action 是一个对象。其中的type属性是必须的。表示Action 的名称。其他属性可以自由设置，
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。


Action Creator:
View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

例：
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action =addTodo('Learn Redux');



store.dispatch()：

store.dispatch()是 View 发出 Action 的唯一方法。
store.dispatch接受一个 Action 对象作为参数，将它发送出去
store.dispatch(addTodo('Learn Redux'));


Reducer：
Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
例：

const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }};

const state = reducer(1, {
  type: 'ADD',
  payload: 2});


createStore接受 Reducer 作为参数，生成一个新的 Store。以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。
例：

const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }];

const total = actions.reduce(reducer, 0); // 3


纯函数： 只要是同样的输入，必定得到同样的输出。


store.subscribe()：
方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
例：

import { createStore } from 'redux';
const store = createStore(reducer);

store.subscribe(listener);


只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。
store.subscribe方法返回一个函数，调用这个函数就可以解除监听。


Reducer 的拆分：
combinReducers:用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
例：

import { combineReducers } from 'redux';

const chatReducer = combineReducers({
  chatLog,
  statusMessage,
  userName
})

export default todoApp;
State 的属性名必须与子 Reducer 同名


不同名的写法：

const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})
// 等同于
function reducer(state = {}, action) {
  return {
    a: doSomethingWithA(state.a, action),
    b: processB(state.b, action),
    c: c(state.c, action)
  }}


可以把所有子 Reducer 放在一个文件里面，然后统一引入。





import { combineReducers } from 'redux'
import * as reducers from './reducers'

const reducer = combineReducers(reducers)


Redux流程：
1.用户发出Action--> stroe.dispatch(action);
2.store自动调用Reducer,传入（当前state，action），返回新的State。
例： let nextState = todoApp（previousState，action）；

3.state发生变化，store会调用监听函数。：

例：stroe.subscribe(listener);

listener可以通过 store.getStore() 得到当前状态，react此时会触发重新渲染view； 

例：


function listerner() {
  let newState = store.getState();
  component.setState(newState);   
}
