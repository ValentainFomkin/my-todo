import {type ChangeEvent, useState} from 'react'
import TextField from '@mui/material/TextField';

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = ({value, onChange}: Props) => {
    const [title, setTitle] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        if (title.trim() !== '') {
            setIsEditMode(false)
            onChange(title)
        } else setError('Title is required')

    }

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {isEditMode ? (
                <TextField value={title}
                           error={!!error}
                           onChange={changeTitle}
                           onBlur={turnOffEditMode}
                           autoFocus
                           id="standard-basic"
                           label={error ? error : 'type something'}
                           variant="standard"/>
                // <input value={title} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus />
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}