import {FC} from 'react'
import {v4 as uuid} from 'uuid'
import {Button} from "./Button";

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    date?: string
}

export type TaskType = {
    id: number
    isDone: boolean
    title: string
}


export const TodolistItem: FC<TodolistPropsType> = (props) => {

    let {title, tasks} = {...props}


    return (
        <div className="todolist">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0
                ? <p>тасок нет</p>
                : (
                    <ul>
                        {tasks.map((t) => {
                            const keyId = uuid()
                            const {isDone, title} = {...t}
                            return (
                                <li key={keyId}>
                                    <input type="checkbox" checked={isDone}/> <span>{title}</span>
                                </li>
                            )
                        })}
                    </ul>
                )}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}
