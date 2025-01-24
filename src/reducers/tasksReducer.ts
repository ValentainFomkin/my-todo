import {TasksState} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksState, action: actionType): TasksState => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let payload = action.payload
            return {...state, [payload.todolistId]: state[payload.todolistId].filter(e => e.id !== payload.taskId)}
        }
        case "CREATE-TASK": {
            const title = action.payload.title
            let payload = action.payload
            const newTask = {id: v1(), title, isDone: false}
            return {...state, [payload.todolistId]: [newTask, ...state[payload.todolistId]]}
        }
        default:
            return state
    }
}

const REMOVE_TASK = 'REMOVE-TASK'
const CREATE_TASK = 'CREATE-TASK'

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>
type CreateTaskACType = ReturnType<typeof createTaskAC>
type actionType = DeleteTaskACType | CreateTaskACType

export const deleteTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {todolistId, taskId}
    } as const
}

export const createTaskAC = (todolistId: string, title: string) => {
    return {
        type: CREATE_TASK,
        payload: {todolistId, title}
    } as const
}