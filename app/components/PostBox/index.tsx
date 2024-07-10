import styles from './index.module.scss'

type Props = {
  content: string
  created_at: string
  username: string
}

export const PostBox = (props: Props) => {
  return <div className={styles.container}>
    <p className={styles.username}>@{ props.username }</p>
    <p>{ props.content }</p>
    <footer>{ props.created_at }</footer>
  </div>
}