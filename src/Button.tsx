import {FC} from "react";

type ButtonType = {
    title: string

}

export const Button: FC<ButtonType> = (props) => {
    const {title} = {...props}
    return (
        <button>
            {title}
        </button>
    );
};

