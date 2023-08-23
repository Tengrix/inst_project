import { NextPage } from 'next';
import React, { PropsWithChildren } from 'react';

import Header from 'src/components/Header/Header';

export const Layout: NextPage<PropsWithChildren> = props => {
    // eslint-disable-next-line react/prop-types
    const { children } = props;

    return (
        <div>
            <Header />
            {children}
        </div>
    );
};
