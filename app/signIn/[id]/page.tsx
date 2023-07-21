import React from 'react';
import {Metadata} from "next";

type Props = {
    params: {
        id: string
    }
}
export const generateMetadata = async ({params: {id}}: Props):Promise<Metadata> => ({
    title: id
});
const DynamicPageTest = ({params: {id}}: Props) => {
    return (
        <div>
            Post page {id}
        </div>
    );
};

export default DynamicPageTest;