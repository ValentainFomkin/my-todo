import {FilterValues, Todolist} from "../App";

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
        case "CHANGE_TODOLIST_FILTER": {
            let payload = action.payload
            return state.map(e => e.id === payload.todolistId ? {...e, filter: payload.filter} : e)
        }

        default:
            return state
    }

}


const CREATE_TODOLIST = 'CREATE_TODOLIST'
const DELETE_TODOLIST = 'DELETE_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'

type createTodolistACType = ReturnType<typeof createTodolistAC>
type deleteTodolistACType = ReturnType<typeof deleteTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

type ActionType = createTodolistACType | deleteTodolistACType | changeTodolistTitleACType | changeFilterACType


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

export const changeFilterAC = (todolistId: string, filter: FilterValues) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        payload: {todolistId, filter}
    } as const
}