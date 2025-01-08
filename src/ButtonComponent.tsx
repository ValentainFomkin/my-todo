import {FC} from "react";

type ButtonType = {
    title: string
    callBack: () => void
}

export const ButtonComponent: FC<ButtonType> = (props) => {
    const {title, callBack} = {...props}

    const onClickHandler = () => {
        callBack()
    }


    return (
        <button onClick={onClickHandler}>
            {title}
        </button>
    );
};

