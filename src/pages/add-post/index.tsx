import { getLayout } from "@/components/Layout/BaseLayout/BaseLayout";
import { Modal } from "@/shared/ui/modal/Modal";
import { Typography } from "@/shared/ui/typography";
import classes from './AddPost.module.scss';


export const AddPost = () => {

    return (
        <div className={classes.container}>
            <Typography as="h1" variant="h1">Add Post</Typography>

            <Modal open title="Add Photo" onClose={() => {}}>
                <Typography as="p" variant="regular16">Content</Typography>
            </Modal>
        </div >
    )
}

AddPost.getLayout = getLayout;
export default AddPost;
