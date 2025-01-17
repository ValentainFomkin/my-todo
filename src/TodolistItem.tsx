import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import type {FilterValues, Task, TaskTodoTypes} from './App'
import {Button} from './Button'


export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValues
}


type Props = {
    title: string
    tasks: Task
    todoId: string
    deleteTask: (todoListID: string, taskId: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (todoId: string, filter: FilterValues) => void
    createTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
    filter: FilterValues
}

export const TodolistItem = (props: Props) => {
    const {
        title,
        tasks,
        todoId,
        deleteTask,
        changeFilter,
        removeTodoList,
        createTask,
        changeTaskStatus,
        filter,
    } = props

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(todoId, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }
    const getFilteredTask = (arr: TaskTodoTypes[], filterValue: FilterValues) => {
        switch (filterValue) {
            case "active": {
                return arr.filter(t => !t.isDone)
            }
            case "completed": {
                return arr.filter(t => t.isDone)
            }
            default: {
                return arr
            }
        }
    }
    const filteredTasks = getFilteredTask(tasks[todoId], filter)


    const changeFilterHandler = (id: string, value: FilterValues) => {
        changeFilter(id, value)
    }

    const removeTodolistHandler = (todoId: string) => {
        removeTodoList(todoId)
    }
    return (
        <div>
            <h3>
                {title}
                <Button title={'x'} onClick={() => removeTodolistHandler(todoId)}/>
            </h3>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {filteredTasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(todoId, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(todoId, task.id, newStatusValue)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler(todoId, 'all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler(todoId, 'active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler(todoId, 'completed')}/>
            </div>
        </div>
    )
}
