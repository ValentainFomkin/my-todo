import './App.css'
import {ChangeEvent, useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem, TodolistsType} from './TodolistItem'
import {Button} from "./Button";

export type TaskTodoTypes = {
    id: string
    title: string
    isDone: boolean
}


export type Task = {
    [key: string]: TaskTodoTypes[]
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

    const todoListID1 = v1()
    const todoListID2 = v1()


    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to by', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<Task>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'tea', isDone: true},
            {id: v1(), title: 'juice', isDone: false},
        ],

    })
    let [todoTitle, setTodoTitle] = useState('')


    const deleteTask = (todoListID: string, taskId: string) => {
        const deletedTask = {...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskId)}
        setTasks(deletedTask)
    }

    const removeTodoList = (todoListID: string) => {
        setTodolists(todolists.filter(t => t.id !== todoListID))
        setTasks({...tasks, [todoListID]: []})
    }
    const changeFilter = (todoId: string, filter: FilterValues) => {
        const newTodo: TodolistsType[] = todolists.map(t => t.id === todoId ? {...t, filter} : t)
        setTodolists(newTodo)
    }


    const createTask = (todoListID: string, title: string) => {
        const newTask: TaskTodoTypes = {id: v1(), title, isDone: false}
        const newTasks: Task = {...tasks, [todoListID]: [newTask, ...tasks[todoListID]]}
        setTasks(newTasks)
    }

    const addNewTodoHandler = (title: string) => {
        const newTodo: TodolistsType = {id: v1(), title, filter: 'all'}
        todoTitle.trim() !== '' && setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodo.id]: []})
        setTodoTitle('')

    }

    const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
        const newTaskState: Task = {
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)
        }
        setTasks(newTaskState)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setTodoTitle(value)
    }
    return (
        <div className="app">
            <div>
                <input value={todoTitle}
                       onChange={(e) => onChangeInputHandler(e)}
                       type={"text"}/>
                <Button title={'Add new todolist'} onClick={() => addNewTodoHandler(todoTitle)}/>
            </div>
            {todolists.length === 0 ? 'error' : todolists.map((tl) => {
                return (
                    <div key={crypto.randomUUID()}>
                        <TodolistItem title={tl.title}
                                      key={crypto.randomUUID()}
                                      todoId={tl.id}
                                      tasks={tasks}
                                      deleteTask={deleteTask}
                                      removeTodoList={removeTodoList}
                                      changeFilter={changeFilter}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}
                                      filter={tl.filter}/>

                    </div>

                )
            })}

        </div>
    )
}
