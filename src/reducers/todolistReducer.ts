import {Todolist} from "../App";

export const todolistReducer = (state: Todolist[], action: ActionType): Todolist[] => {
    switch (action.type) {

        case "CREATE_TODOLIST": {
            let payload = action.payload
            const newTodolist: Todolist = {id: payload.todolistId, title: payload.title, filter: 'all'}
            return [newTodolist, ...state]
        }
        case "DELETE_TODOLIST": {
            let payload = action.payload
            return state.filter(e => e.id !== payload.todolistId)
        }
        case "CHANGE_TODOLIST_TITLE": {
            let payload = action.payload
            return state.map(e => e.id === payload.todolistId ? {...e, title: payload.title} : e)
        }

        default:
            return state
    }

}


const CREATE_TODOLIST = 'CREATE_TODOLIST'
const DELETE_TODOLIST = 'DELETE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'

type createTodolistACType = ReturnType<typeof createTodolistAC>
type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

type ActionType = createTodolistACType | deleteTodolistACType | changeTodolistTitleACType


export const createTodolistAC = (todolistId: string, title: string) => {
    return {
        type: CREATE_TODOLIST,
        payload: {todolistId, title}
    } as const
}

export const deleteTodolistAC = (todolistId: string) => {
    return {
        type: DELETE_TODOLIST,
        payload: {todolistId}
    } as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE,
        payload: {todolistId, title}
    } as const
}