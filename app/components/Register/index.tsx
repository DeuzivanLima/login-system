'use client'
import { useState, FormEvent } from 'react'
import styles from './index.module.scss'
import { useRouter } from 'next/navigation'
import { Button } from '../Button'
import { Input } from '../Input'
import Link from 'next/link'

export const Register = () => {
    const [isLoding, setIsLoding] = useState<boolean>(false)
    const redirect = useRouter()

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoding(true)

        try {
            const formData = new FormData(event.currentTarget)

            const res = await (await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: formData.get('username'),
                    password: formData.get('password')
                })
            }))
            const body = await res.json()

            if(res.status != 200)
                throw body.message

            redirect.push('/login')
        } catch(error) {
            console.log(error)
            
        } finally {
            setIsLoding(false)
        }
    }

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <Input
                placeholder='Username'
                name='username'/>
            <Input
                placeholder='Password'
                type='password'
                name='password'/>
            <Button
                value={isLoding ? 'Registing...' : 'Register'}
                type={'submit'}/>
            <footer>
                <Link href={'/login'}>I have a account</Link>
            </footer>
        </form>
    )
}