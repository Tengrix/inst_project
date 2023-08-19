import {NextPage} from 'next';
import React, {PropsWithChildren} from 'react';
import Header from "src/components/Header/Header";

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return (
        <div>
            <Header/>
            <div>
                {children}
            </div>
        </div>
    )
}

