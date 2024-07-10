'use client'
import { Menu, User, MessageSquare, LogIn } from 'lucide-react'
import styles from './index.module.scss'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  title?: string
}

export const NavigationBar = (props: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <>
      <nav className={styles.container}>
        <h1>{ props.title }</h1>

        <Menu className={styles.menu} onClick={() => setToggleMenu(!toggleMenu)}/>
      </nav>
      <ul className={styles.menu_option} style={{right: toggleMenu ? 0 : '-100%'}}>
        <li>
          <Link className={styles.btn} href='/profile'>
            <User/>
            <span>My Profile</span>
          </Link>
        </li>
        <li>
          <Link className={styles.btn} href='/'>
            <MessageSquare/>
            <span>Global</span>
          </Link>
        </li>
        <li>
          <Link className={styles.btn} href='/login'>
            <LogIn/>
            <span>Login</span>
          </Link>
        </li>
      </ul>
    </>
  )
}