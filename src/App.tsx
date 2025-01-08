import './App.css'
import {TaskType, TodolistItem} from './TodolistItem'


export const App = () => {
//BLL
    const todolistTitle_1: string = 'what to lean'
    const tasks_1: TaskType[] = [
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: true, title: 'JS'},
        {id: 3, isDone: false, title: 'React'},
        {id: 32, isDone: false, title: 'React'},
        {id: 442, isDone: false, title: 'React'},
        {id: 445, isDone: false, title: 'React'},
        {id: 665, isDone: true, title: 'REDUX'}
    ]

    //UI


    return (
        <div className={'app'}>
            <TodolistItem
                tasks={tasks_1}
                title={todolistTitle_1}
            />
        </div>
    )


}


