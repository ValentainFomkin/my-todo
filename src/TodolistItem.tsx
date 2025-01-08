import {ChangeEvent, FC, useState} from 'react'
import {v4 as uuid} from 'uuid'
import {ButtonComponent} from "./ButtonComponent";
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    deletedTask: (id: string) => void
    addNewTasks: (taskTitle: string) => void
    selectedCheckbox: (isDone: boolean, idCheckBox: string) => void
    changeFilter: (filt: FilterValuesType) => void

}


export const TodolistItem: FC<TodolistPropsType> = (props) => {

    let {title, tasks, deletedTask, addNewTasks, selectedCheckbox, changeFilter} = {...props}

    const [inputValue, setInputValue] = useState('')

    const listItems: JSX.Element[] = tasks.map((t) => {
        const keyId = uuid()
        const {isDone, title, id} = {...t}
        return (
            <li key={keyId}>
                <input type="checkbox"
                       onChange={(e) => onChangeCheckboxHandler(e, id)}
                       checked={isDone}
                /> <span>{title}</span>
                <ButtonComponent title={'x'} callBack={() => deletedTask(id)}/>
            </li>
        )
    })


    const tasksList: JSX.Element[] | JSX.Element = tasks.length
        ? <ul>{listItems}</ul>
        : <p>тасок нет</p>


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        // console.log(e.currentTarget.checked, id)
        selectedCheckbox(e.currentTarget.checked, id)
    }
    const addNewTasksHandler = () => {
        addNewTasks(inputValue)
        setInputValue('')
    }


    return (
        <div className="todolist">

            <h3>{title}</h3>
            <div>
                <input value={inputValue}
                       type={"text"}
                       onChange={(event) => onChangeHandler(event)}
                />
                <ButtonComponent title={'+'} callBack={addNewTasksHandler}/>
            </div>
            <div>
                {tasksList}
            </div>
            <div>
                <ButtonComponent title={'All'}
                                 callBack={() => changeFilter('all')}
                />
                <ButtonComponent title={'Active'}
                                 callBack={() => changeFilter('active')}
                />
                <ButtonComponent title={'Completed'}
                                 callBack={() => changeFilter('completed')}
                />
            </div>
        </div>
    )
}
