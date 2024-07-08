'use client'
import { useState, FormEvent } from 'react'
import styles from './index.module.scss'

export const Login = () => {
    const [isLoding, setIsLoding] = useState<boolean>(false)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoding(true)

        try {
            const formData = new FormData(event.currentTarget)

            const res = await (await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.get('username'),
                    password_hash: formData.get('password')
                })
            })).json()

        } catch(error) {
            alert(error)
            
        } finally {
            setIsLoding(false)
        }
    }

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <input placeholder='Username' className={styles.input_info} name='username'/>
            <input placeholder='Password' type='password' className={styles.input_info} name='password'/>
            <button type='submit' className={styles.button_submit}>
                { isLoding ? "Logging" : "Login" }
            </button>
        </form>
    )
}