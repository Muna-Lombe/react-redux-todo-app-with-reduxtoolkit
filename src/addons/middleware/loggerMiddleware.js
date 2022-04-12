export function loggerMiddleware( storeApi ) {
    return function wrapDispatch( next ) {
        return function handleAction( action ) {
            if(action.type === 'todos/todoAdded' ){
                setTimeout(() => {
                    console.log('dispatching-add-action', action)
                    
                    
                }, 5000);
            }
            else if(typeof action === 'function'){
                console.log(storeApi.getState())
               console.log('dispatching fucntion')
            }
            !typeof action === 'function' && console.log('dispatching', action)
            console.log('next state: ', storeApi.getState())
            return next(action)
        }
    }
}