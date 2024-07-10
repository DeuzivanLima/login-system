'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { z } from 'zod'
import { PostBox } from '../PostBox'

const scheme = z.object({
  content: z.string(),
  id: z.string(),
  created_at: z.string(),
  owner_username: z.string()
})

type Props = {
  params?: any
}

export const Profile = (props: Props) => {
  const [username, setUsername] = useState<string>()
  const [createdAt, setCreatedAt] = useState<string>('')
  const [userId, setUserId] = useState<BigInt>()
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const main = async () => {
      let current_user, data
  
      if(props.params != undefined) {
        data = await (await fetch(`/api/user/${props.params.username}`)).json()
      } else {
        current_user = await (await fetch('/api/sessions/dump')).json()
        data = await (await fetch(`/api/user/${current_user.username}`)).json()
      }
  
      if(data.username == undefined)
        alert('User not found')
  
      setUsername(data.username)
      setCreatedAt(data.created_at)
      setUserId(data.id)
  
      if(data.id) {
        const posts = await (await fetch(`/api/post/${data.id}`)).json()
        setPosts(posts)
      }
    } 
    main()
  }, [])

  return (
    <>
      <div className={styles.basic_information_card}>
        <h1>Hello, { username }</h1>
        <span>{ createdAt }</span>
      </div>
      {
        posts.map((val) => {
          const data = scheme.parse(val)
          return <PostBox username={data.owner_username} key={ data.id } content={data.content} created_at={data.created_at}/>
        })
      }
    </>
  )
}