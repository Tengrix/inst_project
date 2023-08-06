import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { Modal } from '@/shared/ui/modal/Modal';
import { Typography } from '@/shared/ui/typography';
import classes from './AddPost.module.scss';
import { ImagePlaceholder, LoremIpsumPlaceholder } from '@/shared/ui/placeholder/placeholder';
import { ImageGalleryUploader, ImageUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useState } from 'react';
import { addImage, removeImage } from '@/shared/lib/imageStore';
import { useDispatch } from 'react-redux';
import { Button } from '@/shared/ui/button';
import { useAppSelector } from '@/store';

export const AddPost = () => {
  const [image, setImage] = useState<string>('');
  const dispatch = useDispatch();
  const error = useAppSelector<string>((state) => state.images.error);
  const images = useAppSelector((state) => state.images.images);

  const onImageChangeHandler = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const { name, size, type } = event.target.files[0];
      const src = URL.createObjectURL(event.target.files[0]);
      setImage(src);
      dispatch(addImage({ name, size, type, src }));
    }
  };

  const deleteImageHandler = (event: any) => {
    if (event.target.value) {
      dispatch(removeImage({ src: event.target.value }));
    }
  };

  return (
    <div className={classes.container}>
      {/* <Typography as="h1" variant="h1">
        Add Post
      </Typography>
      <div className={classes.placeholder}>
        {!image ? <ImagePlaceholder /> : <img src={image} alt="" />}
      </div>
      {'Error ' + error}
      <ImageUploader label="Select from Computer" onImageChangeHandler={onImageChangeHandler} />
      {images.length > 0 && (
        <ul className={classes.images}>
          {images.map(({ src }) => (
            <li key={src} className={classes.images__image}>
              <img key={src} src={src} alt="" />
              <Button
                className={classes.images__image__close}
                onClick={deleteImageHandler}
                value={src}
              >
                X
              </Button>
            </li>
          ))}
        </ul>
      )}
      <LoremIpsumPlaceholder /> */}

      <ImageGalleryUploader label="gallery" onImageChangeHandler={onImageChangeHandler} />
      {/* <Modal open title="Add Photo" onClose={() => {}} /> */}
    </div>
  );
};

AddPost.getLayout = getLayout;
export default AddPost;
