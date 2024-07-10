'use client'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { z } from 'zod'
import { PostBox } from '../PostBox'
import Link from 'next/link'

const scheme = z.object({
  content: z.string(),
  id: z.string(),
  created_at: z.string(),
  owner_username: z.string()
})

export const Home = () => {
  const [posts, setPosts] = useState([])
  const [isLoding, setIsLoding] = useState(true)

  useEffect(() => {
    fetch(`/api/post/all`)
      .then((res) => res.json())
      .then(data => {
        setPosts(data)
        setIsLoding(false)
      })
  }, [])

  return (
    <>
      {
        isLoding ? (
          <p>Loding...</p>
         ) : (
          <>
            <div className={styles.posts}>
            {
              posts.map((val) => {
                const data = scheme.parse(val)
                
                return (
                  <PostBox username={data.owner_username} content={data.content} created_at={data.created_at} key={data.id}/>
                )
              })
            }
            </div>
            <Link href={'/post'} className={styles.float_button}>+</Link>
          </>
         )
      }
    </>
  )
}