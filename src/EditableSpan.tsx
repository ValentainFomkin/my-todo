import {ChangeEvent, FC, useState} from 'react';
import {AddItemForm} from "./AddItemForm";

export type EditableSpanType = {
    value: string
    // onChange: (event: ChangeEvent<HTMLInputElement>) => void
    changeTitle?: (title: string) => void

}

export const EditableSpan: FC<EditableSpanType> = (props) => {
    const {value, changeTitle} = props
    const [isEditMode, setIsEditMode] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const onBlurHandler = () => {
        if (inputValue.trim() !== '') {
            changeTitle!(inputValue)
            setIsEditMode(true)
            setError('')
        } else {
            setError('Title is required')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let event = e.currentTarget.value
        if (event.trim() !== '') {
            setInputValue(event)
            setError('')
        }
    }

    return (
        <>
            {isEditMode ?
                <span onDoubleClick={() => setIsEditMode(false)}>{value}</span>
                : <AddItemForm titleInput={inputValue}
                               error={error}
                               onChange={(e) => onChangeHandler(e)}
                               onKeyUp={onBlurHandler}
                               onBlur={onBlurHandler}/>
            }
            {error && <div className={'error-message'}>{error}</div>}
        </>

    );
};

