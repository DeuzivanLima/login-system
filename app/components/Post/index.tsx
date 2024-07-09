'use client'
import { cookies } from 'next/headers'
import { Button } from '../Button'
import styles from './index.module.scss'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  session: string | undefined
}

export const Post = (props: Props) => {
  const [isLoding, setIsLoding] = useState<boolean>(false)
  const redirect = useRouter()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoding(true)

    const formData = new FormData(event.currentTarget)

    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session: props.session,
          content: formData.get('content')
        })
      })
      const body = await res.json()

      if(res.status != 200)
        throw body.message

      redirect.push('/')
    } catch (error) {
      alert(error)

    } finally {
      setIsLoding(false)

    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <textarea placeholder='Content here' className={styles.content_input} name='content'/>
      <Button className={styles.button_post_it} value='Post It' />
    </form>
  )
}