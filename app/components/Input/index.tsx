import styles from './index.module.scss'

type Props = {
    placeholder?: string,
    className?: any,
    type?: any
    name?: string
}

export const Input = (props: Props) => {
    return <input
        placeholder={props.placeholder}
        className={`${styles.container} ${props.className}`}
        name={props.name}
        type={props.type}
    />
}