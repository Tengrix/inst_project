import { ImageGalleryUploader } from '@/shared/ui/file-uploader/file-uploader';
import classes from './ImageGallery.module.scss';
import { addImage } from '@/shared/lib/imageStore';
import { useDispatch } from 'react-redux';


export const ImageGallery = ({image}) => {
  const dispatch = useDispatch();
  const onImageChangeHandler = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const { name, size, type } = event.target.files[0];
      const src = URL.createObjectURL(event.target.files[0]);
      dispatch(addImage({ name, size, type, src }));
    }
  };

  return (
    <>
      <div className={classes.imageGalleryUploader}>
        <ImageGalleryUploader label="gallery" onImageChangeHandler={onImageChangeHandler} />
      </div>
    </>
  );
};
