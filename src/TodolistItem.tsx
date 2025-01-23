import type {ChangeEvent} from 'react'
import type {FilterValues, Task, Todolist} from './App'
import {CreateItemForm} from './CreateItemForm'
import {EditableSpan} from './EditableSpan'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle,
    } = props

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }

    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={deleteTodolistHandler} aria-label="delete">
                    <DeleteIcon/>
                </IconButton>
                {/*<Button title={'x'} onClick={deleteTodolistHandler}/>*/}
            </div>
            <CreateItemForm onCreateItem={createTaskHandler}/>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }
                        const label = {inputProps: {'aria-label': 'Checkbox demo'}};
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox {...label} defaultChecked checked={task.isDone}
                                          onChange={changeTaskStatusHandler}/>
                                {/*<input type="checkbox" checked={task.isDone}*/}
                                {/*       onChange={changeTaskStatusHandler}/>*/}
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <IconButton onClick={deleteTaskHandler} aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                                {/*<Button title={'x'} onClick={deleteTaskHandler}/>*/}
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button onClick={() => changeFilterHandler('all')}
                        variant={filter === 'all' ? 'outlined' : 'contained'}
                        color="success">All</Button>
                <Button onClick={() => changeFilterHandler('active')}
                        variant={filter === 'active' ? 'outlined' : 'contained'}
                        color="primary">Active</Button>
                <Button onClick={() => changeFilterHandler('completed')}
                        variant={filter === 'completed' ? 'outlined' : 'contained'}
                        color="error">Completed</Button>

                {/*  <Button className={filter === 'all' ? 'active-filter' : ''}*/}
                {/*          title={'All'}*/}
                {/*          onClick={() => changeFilterHandler('all')}/>*/}
                {/*  <Button className={filter === 'active' ? 'active-filter' : ''}*/}
                {/*          title={'Active'}*/}
                {/*          onClick={() => changeFilterHandler('active')}/>*/}
                {/*  <Button className={filter === 'completed' ? 'active-filter' : ''}*/}
                {/*          title={'Completed'}*/}
                {/*          onClick={() => changeFilterHandler('completed')}/>*/}
            </div>
        </div>
    )
}
