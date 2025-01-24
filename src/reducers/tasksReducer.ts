import {TasksState} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksState, action: ActionType): TasksState => {
    switch (action.type) {
        case 'REMOVE_TASK-TASK': {
            let payload = action.payload
            return {...state, [payload.todolistId]: state[payload.todolistId].filter(e => e.id !== payload.taskId)}
        }
        case "CREATE_TASK": {
            const title = action.payload.title
            let payload = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {...state, [payload.todolistId]: [newTask, ...state[payload.todolistId]]}
        }
        case "CHANGE_TASK_STATUS": {
            let payload = action.payload
            return {
                ...state, [payload.todolistId]: state[payload.todolistId].map(e => e.id === payload.taskId
                    ? {...e, isDone: payload.isDone} : e
                )
            }
        }
        case "CHANGE_TASK_TITLE": {
            let payload = action.payload
            return {
                ...state, [payload.todolistId]: state[payload.todolistId].map(e => e.id === payload.taskId
                    ? {...e, title: payload.title} : e
                )
            }
        }
        case "CREATE_TASK_FOR_TODOLIST": {
            let payload = action.payload
            return {...state, [payload.todolistId]: []}
        }
        case "DELETE_TASK_FOR_TODOLIST": {
            let payload = action.payload
            delete state[payload.todolistId]
            return {...state}
        }
        default:
            return state
    }
}

const REMOVE_TASK = 'REMOVE_TASK-TASK'
const CREATE_TASK = 'CREATE_TASK'
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const CREATE_TASK_FOR_TODOLIST = 'CREATE_TASK_FOR_TODOLIST'
const DELETE_TASK_FOR_TODOLIST = 'DELETE_TASK_FOR_TODOLIST'

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type CreateTaskACType = ReturnType<typeof createTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type createTaskForTodolistACType = ReturnType<typeof createTaskForTodolistAC>
type deleteTaskForTodolistACType = ReturnType<typeof deleteTaskForTodolistAC>

type ActionType =
    DeleteTaskACType
    | CreateTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | createTaskForTodolistACType
    | deleteTaskForTodolistACType

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {todolistId, taskId}
    } as const
}
export const deleteTaskForTodolistAC = (todolistId: string) => {
    return {
        type: DELETE_TASK_FOR_TODOLIST,
        payload: {todolistId}
    } as const
}

export const createTaskAC = (todolistId: string, title: string) => {
    return {
        type: CREATE_TASK,
        payload: {todolistId, title}
    } as const
}
export const createTaskForTodolistAC = (todolistId: string) => {
    return {
        type: CREATE_TASK_FOR_TODOLIST,
        payload: {todolistId}
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {todolistId, taskId, isDone}
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: CHANGE_TASK_TITLE,
        payload: {todolistId, taskId, title}
    } as const
}