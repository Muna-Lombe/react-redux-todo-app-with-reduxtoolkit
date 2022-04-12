import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { createSelector } from "reselect"
// import {  FILTER__COLOR_FILTER_CHANGED, TODOS__ALL_COMPLETED, TODOS__COLOR_SELECTED, TODOS__COMPLETED_CLEARED, TODOS__TODOS_LOADING,TODOS__TODOS_LOADING_FAILED,TODOS__TODOS_LOADED, TODOS__TODO_ADDED, TODOS__TODO_DELETED, TODOS__TODO_TOGGLED } from "../../actionTypes"
import { StatusFilters } from "../filters/filtersSlice"

 const todosAdapter =  createEntityAdapter()
 const initialState = todosAdapter.getInitialState({
     status: 'idle'
 })
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?id=1&id=2&id=3&id=4&id=5')
    const data = await response.json()
    const todos = data.map(( todo ) => Object.assign({"id": todo.id, "text": todo.title, "color": "", "completed": todo.completed }) )
    console.log('todos fetched', {todos})
    return {todos}
})

export const saveNewTodos = createAsyncThunk('todos/saveNewTodo', async (text) => {
    const initialTodo = { text }
    const response = await fetch('https://jsonplaceholder.typicode.com/todos',
                                {
                                    method: 'POST',
                                    body: JSON.stringify(initialTodo),
                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8'
                                    }
                                })
    const newTodo = await response.json()
    return newTodo
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async ({text, todoId}) => {
    const initialTodo = { text }
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?id=${todoId}`,
                                        {
                                            method: 'PUT',
                                            body: JSON.stringify(initialTodo),
                                            headers: {
                                                'Content-type': 'application/json; charset=UTF-8'
                                            }
                                        })
    const updatedTodo = await response.json()    
    return updatedTodo                               
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (todoId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`,
                                        {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-type': 'application/json; charset=UTF-8'
                                            }
                                        })
    const deletedTodo = await response.json()
    return { id: todoId, deletedTodo }

})
            
    
const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action) {
            const todo = action.payload
            state.entities[todo.id] = todo
        },
        todoToggled(state, action) {
            const todoId = action.payload
            const todo = state.entities[todoId]
            todo.completed = !todo.completed
        },
        todoColorSelected: {
            reducer(state, action) {
            const { color, todoId } = action.payload
            state.entities[todoId].color = color
            },
            prepare(todoId, color) {
            return {
                payload: { todoId, color },
            }
            },
        },
        //   todoDeleted(state, action) {

        //     delete state.entities[action.payload]
        //   },
        todoDeleted: todosAdapter.removeOne, 
        allTodosCompleted(state, action) {
            Object.values(state.entities).forEach((todo) => {
            todo.completed = true
            })
        },
        completedTodosCleared(state, action) {
            const completedIds = Object.values(state.entities)
                .filter((todo) => todo.completed)
                .map((todo) => todo.id)
            todosAdapter.removeMany(state, completedIds)
            // Object.values(state.entities).forEach((todo) => {
            // if (todo.completed) {
            //     delete state.entities[todo.id]
            // }
            // })
      },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                todosAdapter.setAll(state, action.payload.todos)
                state.status = 'idle'
                console.log(state)

            })
            // .addCase(saveNewTodos.fulfilled, (state, action) => {
            //     const todo = action.payload
            //     state.entities[todo.id] = todo
            // })
            .addCase(saveNewTodos.fulfilled, todosAdapter.addOne)
            .addCase(updateTodo.pending, (state, action) => {
                const todoId = action.payload.id
                const text = action.payload.text
                state.entities[todoId] = text
            })

    }
  })

export const {todoAdded, todoToggled, todosLoading, todoColorSelected, todoDeleted} = todosSlice.actions

export default todosSlice.reducer

export const { selectAll: selectTodos, selectById: selectTodoById } = todosAdapter.getSelectors( state => state.todos )

export const selectTodoIds = createSelector(
    selectTodos,
    todos => todos.map(todo => todo.id)
)

export const selectFilteredTodos = createSelector(
    selectTodos,
    state => state.filters,
    (todos, filters) => {
        const {status, colors} = filters
        const showAllCompletions = status === StatusFilters.All
        if (showAllCompletions && colors.length === 0){
            return todos
        }
        const completedStatus = status === StatusFilters.Completed
        return todos.filter( todo => {
            const statusMatches = showAllCompletions || todo.completed === completedStatus
            const colorMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorMatches
        })
    }
)

export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    filteredTodos => filteredTodos.map((todo) => todo.id)
)

