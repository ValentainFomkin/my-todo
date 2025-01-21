import './App.css'
import {ChangeEvent, useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'
import {AddItemForm} from "./AddItemForm";
import {Button} from "./Button";

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })
    let [todoTitle, setTodoTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const onchangeTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
        let event = e.currentTarget.value
        if (event.trim() !== '') {
            setTodoTitle(event)
            setError(null)
        }
    }

    const onKeyUpHandler = () => {
        createTodolist()
    }

    const createTodolist = () => {
        let newTitle = todoTitle.trim()
        let newTodo: Todolist = {id: v1(), title: newTitle, filter: 'all'}
        if (newTitle !== '') {
            setTodolists([newTodo, ...todolists])
            setTasks({...tasks, [newTodo.id]: []})
            setTodoTitle('')
            setError(null)
        } else {
            setError('Title is required')
        }

    }

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, title} : task)})
    }
    const changeTodoTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(e => e.id === todolistId ? {...e, title} : e))
    }

    return (
        <div className="app">
            <div>
                <AddItemForm titleInput={todoTitle}
                             error={error}
                             onChange={(e) => onchangeTodoTitle(e)}
                             onKeyUp={onKeyUpHandler}
                />
                <Button title={'+'} onClick={createTodolist}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <TodolistItem key={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  deleteTodolist={deleteTodolist}
                                  changeTaskTitle={changeTaskTitle}
                                  changeTodoTitle={changeTodoTitle}
                    />
                )
            })}
        </div>
    )
}
