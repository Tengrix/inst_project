import {NextPage} from 'next';
import React, {PropsWithChildren} from 'react';
import Header from "src/components/Header/Header";
import s from "./Layout.module.scss"

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return (
            <div className={s.container}>
                <Header/>
                {children}
            </div>
    )
}

