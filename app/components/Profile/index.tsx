'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { string, z } from 'zod'
import { PostBox } from '../PostBox'

const scheme = z.object({
  content: z.string(),
  id: z.string(),
  created_at: z.string()
})

export const Profile = () => {
  const [username, setUsername] = useState<string>()
  const [createdAt, setCreatedAt] = useState<string>('')
  const [userId, setUserId] = useState<BigInt>()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const main = async () => {
      const data = await (await fetch('/api/user')).json()

      setUsername(data.username)
      setCreatedAt(data.created_at)
      setUserId(data.id)

      if(username != undefined) {
        console.log(username)
        const posts = await (await fetch(`/api/post/${username}`)).json()
        
        setPosts(posts)
      }
    } 
    main()
  }, [username])

  return (
    <>
      <div className={styles.basic_information_card}>
        <h1>Hello, { username }</h1>
        <span>{ createdAt }</span>
      </div>
      {
        posts.map((val) => {
          const data = scheme.parse(val)
          return <PostBox key={ data.id } content={data.content} created_at={data.created_at}/>
        })
      }
    </>
  )
}