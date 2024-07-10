import Link from 'next/link'
import styles from './index.module.scss'

export const NotLogged = () => {
  return (
    <div className={styles.container}>
      <h1>
        Você Não Está Logado, clique <Link href={'/login'}>aqui</Link>
      </h1>
    </div>
  )
}