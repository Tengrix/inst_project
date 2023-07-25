import {NextPage} from 'next';
import React, {PropsWithChildren} from 'react';
import Header from "components/Header/Header";
import {store} from "store";
import {Provider} from "react-redux";

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return (
        <div>
            <Provider store={store}>
                <Header/>
                <div>
                    {children}
                </div>
            </Provider>
        </div>
    )
}

