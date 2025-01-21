import {ChangeEvent, FC, KeyboardEvent} from 'react';

export type AddItemFormType = {
    titleInput: string
    error?: string | null
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyUp?: () => void
    onBlur?: () => void
}


export const AddItemForm: FC<AddItemFormType> = (props) => {
    const {titleInput, error, onChange, onKeyUp, onBlur} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        let event = e.key
        if (event.trim() === 'Enter') {
            onKeyUp!()
        }
    }

    return (
        <input className={error ? 'error' : ''}
               value={titleInput}
               onChange={(e) => onChangeHandler(e)}
               onKeyUp={(e) => onKeyUpHandler(e)}
               onBlur={onBlur}
        />
    );
};

