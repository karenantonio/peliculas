import React, { forwardRef } from 'react';
import styles from './Input.module.css'

interface Props {
    type?: string
    name?: string
    titulo: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    msg_error?: string | null
}

const Input = forwardRef<HTMLInputElement, Props>(({ type = 'text', name = 'texto', titulo, onChange, value, msg_error }: Props, ref) => {
    return (
        <>
            <label className={styles.label} htmlFor={name}>{titulo}:</label>
            <input className={styles.input} type={type} name={name} id={name} onChange={onChange} value={value} ref={ref} />
            {msg_error && <p className={styles.error}>{msg_error}</p>}
        </>
    )
});

export default Input