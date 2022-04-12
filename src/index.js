import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { fetchTodos } from './features/todos/todosSlice'

store.dispatch(fetchTodos())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import store from './store'

// // log initial state
// console.log('Initial state: ', store.getState())

// const unsubcribe = store.subscribe(() => 
//     console.log('state after dispatch: ', store.getState())
// )

// store.dispatch({ type: 'todos/todoAdded', payload: 'learn abour actions'})
// store.dispatch({ type: 'todos/todoAdded', payload: 'try reducers'})
// // store.dispatch({ type: 'todos/todAdded', payload: 'about stores'})

// store.dispatch({ type: 'todos/todoToggled', payload: 0})
// store.dispatch({ type: 'todos/todoToggled', payload: 1})

// store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active'})

// store.dispatch({
//     type: 'filters/colorFilterChanged',
//     payload: {
//         color: 'red',
//         changeType: 'added'
//     }
// })
// store.dispatch({ type: 'todos/colorSelected', payload: {id:1, color:'red'}})

// // stop listening for updates to state
// unsubcribe()

// store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })