import appSt from './App.module.css'
import {TaskType, TodolistItem} from './TodolistItem'
import {ButtonComponent} from "./ButtonComponent";
import {v1} from 'uuid'
import {useState} from "react";

export type FilterValuesType = 'all' | 'active' | 'completed'

export const App = () => {
//BLL
    const todolistTitle: string = 'what to lean'
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), isDone: true, title: 'HTML&CSS'},
        {id: v1(), isDone: true, title: 'REDUX'}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        const nextState: TaskType[] = tasks.filter(t => t.id !== taskId)
        setTasks(nextState)
    }

    const addNewTasks = (taskTitle: string) => {
        let newTask: TaskType = {id: v1(), isDone: false, title: taskTitle}
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

    const getFilteredTasks = (allTasks: TaskType[], filterValue: FilterValuesType): TaskType[] => {
        switch (filterValue) {
            case "active":
                return allTasks.filter(t => !t.isDone)
            case "completed":
                return allTasks.filter(t => t.isDone)
            default:
                return allTasks
        }
    }


    const filteredTasksForRender: TaskType[] = getFilteredTasks(tasks, filter)

//UI
    return (
        <div className={appSt.app}>
            <div>
                <ButtonComponent title={'ADD NEW TODOLIST'} callBack={() => {
                }}/>
            </div>
            <TodolistItem
                tasks={filteredTasksForRender}
                title={todolistTitle}
                removeTask={removeTask}
                addNewTasks={addNewTasks}
                selectedCheckbox={selectedCheckbox}
                changeFilter={changeFilter}
            />
        </div>
    )


}


