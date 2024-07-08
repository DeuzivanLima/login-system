import React from "react"

type Props = {
    children?: React.ReactNode,
    className?: string
}

export const Layout = (props: Props) => {
    return (
        <main className={props.className}>
            { props.children }
        </main>
    )
}