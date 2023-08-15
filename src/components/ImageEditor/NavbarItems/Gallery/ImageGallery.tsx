import classes from './ImageGallery.module.scss';
import { addImage, currentImage, removeImage } from '@/shared/lib/imageStore';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useAppDispatch, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';

export const ImageGallery = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.images.images);

  const addImageToGallery = (event: any) => {
    console.log('BUTTON IS WORKING');
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const blob = event.target.files[0];
      const { name, size, type } = blob;
      const src = URL.createObjectURL(blob);
      const filters = {};
      const originalSRC = src;
      const image = {
        name,
        size,
        type,
        src,
        originalSRC,
        filters,
        get hash() {
          return this.originalSRC.replace(/^.*\//, '');
        },
      };
      dispatch(addImage({ ...image }));
      dispatch(currentImage(originalSRC));
    }
    console.log('BUTTON IS WORKING');
  };
  const removeImageFromGallery = (e: any) => {
    if (e.currentTarget.value) {
      console.log('CLIKC<+++');
      dispatch(removeImage({ src: e.currentTarget.value }));
    }
  };

  return (
    <div className={classes.imageGalleryUploader}>
      <div className={classes.galleryContainer}>
        {images.length > 0 && (
          <ul className={classes.images}>
            {images.map(({ originalSRC, src, hash }) => (
              <li key={src} className={classes.images__image}>
                <img
                  src={src}
                  id={hash}
                  alt=""
                  onClick={() => {
                    dispatch(currentImage(originalSRC));
                  }}
                />
                <Button
                  className={classes.images__image_close}
                  onClick={removeImageFromGallery}
                  value={originalSRC}
                >
                  <span className={classes.icon__close}></span>
                </Button>
              </li>
            ))}
          </ul>
        )}
        <ImageUploader label={'+'} onImageChangeHandler={addImageToGallery} />
      </div>
    </div>
  );
};
