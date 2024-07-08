import styles from './index.module.scss'

type Props = {
    value?: string,
    className?: any,
    type?: any
}

export const Button = (props: Props) => {
    return <button className={`${styles.container} ${props.className}`} type={props.type}>
        { props.value }
    </button>
}