import './App.css'
import {TaskType, TodolistItem} from './TodolistItem'
import {ButtonComponent} from "./ButtonComponent";
import {v4 as uuid} from 'uuid'
import {useState} from "react";

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
//BLL
    const todolistTitle: string = 'what to lean'
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: '1', isDone: true, title: 'HTML&CSS'},
        {id: '2', isDone: true, title: 'JS'},
        {id: '3', isDone: false, title: 'React'},
        {id: '32', isDone: false, title: 'React'},
        {id: '442', isDone: false, title: 'React'},
        {id: '445', isDone: false, title: 'React'},
        {id: '665', isDone: true, title: 'REDUX'}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const deletedTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addNewTasks = (taskTitle: string) => {
        let newTaskId = uuid()
        let newTask: TaskType = {id: newTaskId, isDone: true, title: taskTitle}
        let newTasks: TaskType[] = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const selectedCheckbox = (isDoneCheckbox: boolean, idCheckbox: string) => {
        let newTasksIsDone: TaskType[] = tasks.map(t => t.id === idCheckbox ? {...t, isDone: isDoneCheckbox} : t)
        setTasks(newTasksIsDone)
    }

    const changeFilter = (filt: FilterValuesType) => {
        setFilter(filt)
    }
    let filteredTasks: TaskType[] = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }


//UI
    return (
        <div className={'app'}>
            <div>
                <ButtonComponent title={'ADD NEW TODOLIST'} callBack={() => {
                }}/>
            </div>
            <TodolistItem
                tasks={filteredTasks}
                title={todolistTitle}
                deletedTask={deletedTask}
                addNewTasks={addNewTasks}
                selectedCheckbox={selectedCheckbox}
                changeFilter={changeFilter}
            />
        </div>
    )


}


