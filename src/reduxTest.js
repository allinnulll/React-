import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

import Counter from './Counter'
// import counter from './reducers'


const rootEl = document.getElementById('reduxTest')

// Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。
// 这种 State 的计算过程就叫做 Reducer。
const counter = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
}


// store.dispatch方法会触发 Reducer 的自动执行。
// 为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
const store = createStore(counter);


// store.dispatch()是 View 发出 Action 的唯一方法。
const render = () => ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    rootEl
  )
  
  render()
  store.subscribe(render)