import React from 'react'
import styles from './button.module.css'

export default function OutlinedBtn({ title, onClick, style, disabled, className }) {
    return (
        <button onClick={onClick} className={`${styles.outLinedBtn} ${className}`} style={style} disabled={disabled}>{title}</button>
    )
}
