import React from 'react';

import styles from './Button.module.css';

export const Button = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{text}</span>
            <img className={styles.arrow} src="/images/arrow-forward.png" alt="arrow-forward"></img>
        </button>  
    );
}
