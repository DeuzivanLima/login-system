import styles from './index.module.scss'

type Props = {
  content: string
  created_at: string
}

export const PostBox = (props: Props) => {
  return <div className={styles.container}>
    <p>{ props.content }</p>
    <footer>{ props.created_at }</footer>
  </div>
}