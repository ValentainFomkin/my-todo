import {ChangeEvent, FC, useState} from 'react'
import {v1} from 'uuid'
import {ButtonComponent} from "./ButtonComponent";
import {FilterValuesType} from "./App";
import s from './TodolistItem.module.css'
import appS from './App.module.css'


export type TaskType = {
    id: string
    isDone: boolean
    title: string
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    removeTask: (id: string) => void
    addNewTasks: (taskTitle: string) => void
    selectedCheckbox: (isDone: boolean, idCheckBox: string) => void
    changeFilter: (filt: FilterValuesType) => void

}


export const TodolistItem: FC<TodolistPropsType> = (props) => {

    let {title, tasks, removeTask, addNewTasks, selectedCheckbox, changeFilter} = props

    const [inputValue, setInputValue] = useState('')

    const listItems: JSX.Element[] = tasks.map((t) => {
        const keyId = v1()
        const {isDone, title, id} = {...t}
        return (
            <li key={keyId}>
                <input type="checkbox"
                       onChange={(e) => onChangeCheckboxHandler(e, id)}
                       checked={isDone}
                /> <span>{title}</span>
                <ButtonComponent title={'x'} callBack={() => removeTask(id)}/>
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
        inputValue !== '' ? addNewTasks(inputValue) : alert('Напиши что-нибудь, плиз')
        setInputValue('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addNewTasksHandler()
    }


    return (
        <div className={appS.todolist}>

            <h3>{title}</h3>
            <div>

                <input className={!inputValue
                    ? s.inputTodoNotActive
                    : s.inputTodoActive
                }
                       value={inputValue}
                       type={"text"}
                       onChange={(e) => onChangeHandler(e)}
                       onKeyUp={(e) => onKeyPressHandler(e)}
                />
                <ButtonComponent title={'+'}
                                 useStateValue={inputValue}
                                 callBack={addNewTasksHandler}
                />
                {inputValue.length === 0
                    ? <div style={{color: 'red'}}>Напечатай что-нибудь</div>
                    : <div style={{color: 'blue'}}>Печатай, красавичк</div>
                }

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
