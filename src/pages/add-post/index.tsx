import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { Modal } from '@/shared/ui/modal/Modal';
import { Typography } from '@/shared/ui/typography';
import classes from './AddPost.module.scss';
import { ImagePlaceholder, LoremIpsumPlaceholder } from '@/shared/ui/placeholder/placeholder';
import { ImageUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useState } from 'react';
import { addImage } from '@/shared/lib/imageStore';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store';

export const AddPost = () => {
  const [image, setImage] = useState<string>('');
  const dispatch = useDispatch();

  const onImageChangeHandler = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      dispatch(addImage({ image: URL.createObjectURL(event.target.files[0]) }));
    }
  };

  return (
    <div className={classes.container}>
      <Typography as="h1" variant="h1">
        Add Post
      </Typography>
      <div className={classes.placeholder}>
        {!image ? <ImagePlaceholder /> : <img src={image} />}
      </div>
      <ImageUploader label="Select from Computer" onImageChangeHandler={onImageChangeHandler} />
      <LoremIpsumPlaceholder />
      {/*<Modal open title="Add Photo" onClose={() => {}}/>*/}
    </div>
  );
};

AddPost.getLayout = getLayout;
export default AddPost;
