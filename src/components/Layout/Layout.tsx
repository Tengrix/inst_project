import {NextPage} from 'next';
import React, {PropsWithChildren} from 'react';
import Header from "@/components/Header/Header";

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







// import {NextPage} from 'next';
// import React, {PropsWithChildren} from 'react';
// import Header from "@/components/Header/Header";
// import { LangSwitcher } from '../langSwitcher/LangSwitcher';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// export const Layout: NextPage<PropsWithChildren> = (props) => {
//     const {children} = props

//     return (
//         <div>
//             <Header 
//                 title="New Title"
//                 children={<div>curaban</div>}
                
//                 icon={<FontAwesomeIcon icon={faEnvelope} />}
//             />
//             <div>
//                 {children}
//             </div>
//             <Header />
//         </div>
//     )
// }
