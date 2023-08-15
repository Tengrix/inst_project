import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout';
import { Modal } from '@/shared/ui/modal/Modal';
import { Typography } from '@/shared/ui/typography';
import classes from './AddPost.module.scss';
import { ImagePlaceholder, LoremIpsumPlaceholder } from '@/shared/ui/placeholder/placeholder';
import { ImageUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useState } from 'react';
import { addImage, currentImage, removeImage } from '@/shared/lib/imageStore';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/shared/ui/button';
import { useAppSelector } from '@/store';

import { ImageEditor } from '@/components/ImageEditor/ImageEditor';

export const AddPost = () => {
  const [image, setImageIndex] = useState<string>('');
  //const [isShowGallery, seIsShowGallery] = useState(false);

  //const isShowGallery = useAppSelector((state) => state.images.isShowGallery);

  const images = useAppSelector((state) => state.images.images);
  const dispatch = useDispatch();
  const error = useAppSelector<string>((state) => state.images.error);

  const onImageChangeHandler = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const blob = event.target.files[0];
      const { name, size, type } = blob;
      const src = URL.createObjectURL(event.target.files[0]);
      const filters = {}
      const image = {
        name,
        size,
        type,
        src,
        originalSRC: src,
        filters,
        get hash() {
          return this.originalSRC.replace(/^.*\//, '')
        }
      };

      
      dispatch(addImage({ ...image }));
      dispatch(currentImage(src));
    }
  };

  const deleteImageHandler = (event: any) => {
    if (event.target.value) {
      dispatch(removeImage({ src: event.target.value }));
    }
  };

  return (
    <div className={classes.container}>
      <Typography as="h1" variant="h1">
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
      <LoremIpsumPlaceholder />

      <ImageEditor image={''} />


      {/* <Modal open title="Add Photo" onClose={() => {}} /> */}
    </div>
  );
};

AddPost.getLayout = getLayout;
export default AddPost;
