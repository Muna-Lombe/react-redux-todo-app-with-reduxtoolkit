export function fetcherMiddleware(storeApi){
    return function wrapDispatch(next){
        return async function handleAction(action){
            if( typeof action === 'function'){
                return action(storeApi.dispatch, storeApi.getState)
            }
            // https://jsonplaceholder.typicode.com/todos?id=1&id=2&id=3&id=4&id=5
            
            return next(action)
        }
    }
}