import React from "react";
import styles from "./Button.module.css"


const Button = (props) => {
    const { children, variant, ...rest } = props;
    return (
        <button {...rest} className={styles[variant]}>
            {children}
        </button>
    );
};
export default React.memo(Button);
