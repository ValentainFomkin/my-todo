import {FC} from "react";

type ButtonType = {
    title: string
    callBack: () => void
    useStateValue?: string
    
}

export const ButtonComponent: FC<ButtonType> = (props) => {
    const {title, callBack, useStateValue} = {...props}

    const onClickHandler = () => {
        callBack()
    }


    return (
        <button onClick={onClickHandler}
                disabled={useStateValue === ''}
        >
            {title}
        </button>
    );
};

