import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { Modal } from '@/shared/ui/modal/Modal';
import { Typography } from '@/shared/ui/typography';
import classes from './AddPost.module.scss';
import { ImagePlaceholder, LoremIpsumPlaceholder } from '@/shared/ui/placeholder/placeholder';

export const AddPost = () => {
  return (
    <div className={classes.container}>
      <Typography as="h1" variant="h1">
        Add Post
      </Typography>

      <Modal open title="Add Photo" onClose={() => {}}>
        <ImagePlaceholder />
        <LoremIpsumPlaceholder />
      </Modal>
    </div>
  );
};

AddPost.getLayout = getLayout;
export default AddPost;
