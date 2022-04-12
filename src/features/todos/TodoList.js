import React from 'react'
import { useSelector} from 'react-redux'
// import { TODOS__TODOS_LOADING_FAILED } from '../../actionTypes'
import TodoListItem from './TodoListItem'
import { selectFilteredTodoIds} from './todosSlice'
// selectFilteredTodoIds
const TodoList = () => {
  // we use shallowEqual as a second argument to useSelector because 
  // useSelector takes a comparison function as a second argument
  // shallowEqual allows us to change how useSelector evaluates if two values are equal 
  // in order to re-render. 
  // here, because we are returning a new array reference, useSelector will cause the whole component to 
  // re-render, but because nothing has changed in the component and we only want to pass the ids to the child component
  // we use shallowEqual to prove that the old value and new value are the same 
  // then useSelector will not re-render.


  const todos = useSelector(selectFilteredTodoIds)
  


  // LOOK AT THIS PART AGAIN LATER, UNSAFE MUTATION OF RECEIVED TODOS
  console.log(todos)
  const loadingStatus = useSelector(state => state.todos.status)

  
  if (loadingStatus === 'loading') {
   
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    )
  }

  if (loadingStatus === 'failure'){
    return ( 
      <div className="todo-list">
        <h3>
          ⚠️ Looks like we could not connect, try reloading the page.
        </h3>
      </div>
    )
  }
  
  
  const renderedListItems = todos.map(( todoId ) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList