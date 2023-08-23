import React, { useState } from 'react';

import CreatePostModal from '@/components/CreatePostModal/CreatePostModal';
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';

import classes from './AddPost.module.scss';

export const AddPost = () => {
    const [createPostModal, setCreatePostModal] = useState(false);

    return (
        <div className={classes.container}>
            <CreatePostModal open={createPostModal} modalHandler={setCreatePostModal} />
        </div>
    );
};

AddPost.getLayout = getLayout;
export default AddPost;
