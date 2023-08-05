import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { Modal } from '@/shared/ui/modal/Modal';
import { Typography } from '@/shared/ui/typography';
import classes from './AddPost.module.scss';
import { ImagePlaceholder, LoremIpsumPlaceholder } from '@/shared/ui/placeholder/placeholder';
import { ImageUploader } from '@/shared/ui/file-uploader/file-uploader';

export const AddPost = () => {
  return (
    <div className={classes.container}>
      <Typography as="h1" variant="h1">
        Add Post
      </Typography>
      <ImagePlaceholder />
      <ImageUploader label="Select from Computer" />
      <LoremIpsumPlaceholder />
      {/*<Modal open title="Add Photo" onClose={() => {}}/>*/}
    </div>
  );
};

AddPost.getLayout = getLayout;
export default AddPost;
