{type: 'todos/todoAdded', payload: todoText} #add a todo
{type: 'todos/todoToggled', payload: todoId} #Toggle the completed status of a todo
{type: 'todos/colorSelected, payload: {todoId, color}} #Select a color category for a todo
{type: 'todos/todoDeleted', payload: todoId} #Delete a todo
{type: 'todos/allCompleted'} #Mark all todos as completed
{type: 'todos/completedCleared'} #Clear all completed todos
{type: 'filters/statusFilterChanged', payload: filterValue} #Choose a different "completed" filter value
{type: 'filters/colorFilterChanged', payload: {color, changeType}} #Add a new color filter
{type: 'filters/colorFilterRemoved', payload: {color}} #Remove a color filter
