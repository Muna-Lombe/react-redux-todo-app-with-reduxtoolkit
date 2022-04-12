import React, { useState } from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'

import { availableColors, capitalize } from '../filters/colors'
import { useDispatch, useSelector } from 'react-redux'
import { selectTodoById, todoToggled, todoColorSelected, todoDeleted } from './todosSlice'
// import { FILTER__COLOR_FILTER_CHANGED, TODOS__COLOR_SELECTED, TODOS__TODO_DELETED, TODOS__TODO_TOGGLED } from '../../actionTypes'




const TodoListItem = ({ id, onColorChange, onCompletedChange, onDelete }) => {
//    const [itemStatus, setItemStatus] =  useState('idle')
    const todo = useSelector(state => selectTodoById(state, id))
    
    const { text, completed, color } = todo
    

    const dispatch = useDispatch()

    const handleCompletedChanged = (e) => {
        dispatch(todoToggled(todo.id))
    }

    const handleColorChanged = (e) => {
        const color = e.target.value
        dispatch(todoColorSelected(color, todo.id))
    }
    const handleDelete = () => {
        // const todoDeletedThunk = todoDeleted(todo.id)
        // dispatch(todoDeletedThunk)
        dispatch(todoDeleted(todo.id))
    }
    const colorOptions = availableColors.map((c) => (
        <option key={c} value={c}>
        {capitalize(c)}
        </option>
    ))
    // let isLoading = itemStatus === 'loading'
    // let loader = isLoading ? <div className="loader" /> : null
    return (
        <li>
        <div className="view">
            <div className="segment label">
            <input
                className="toggle"
                type="checkbox"
                checked={completed}
                onChange={handleCompletedChanged}
            />
            <div className="todo-text">{text}</div>
            </div>
            <div className="segment buttons">
            <select
                className="colorPicker"
                value={color}
                style={{ color }}
                onChange={handleColorChanged}
            >
                <option value=""></option>
                {colorOptions}
            </select>
            <button className="destroy" onClick={()=>handleDelete()}>
                <TimesSolid />
            </button>
            </div>
        </div>
        {/* {loader} */}
        </li>
    )
}

export default TodoListItem