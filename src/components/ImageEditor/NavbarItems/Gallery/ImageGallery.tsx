import { addImage, parseImageBlob, removeImage, setCurrentImage } from '@/shared/lib/imageStore';
import { ImageUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useAppDispatch, useAppSelector } from '@/store';
import classes from './ImageGallery.module.scss';

export const ImageGallery = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.images.images);

  const addImageToGallery = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const blob = event.target.files[0];
      const image = parseImageBlob(blob);
      dispatch(addImage(image));
    }
  };

  const removeImageFromGallery = (e: any) => {
    if (e.currentTarget.value) {
      dispatch(removeImage({ src: e.currentTarget.value }));
    }
  };

  const imagePreview = images.map(({ originalSRC }) => (
    <li key={originalSRC} className={classes.image}>
      <img
        src={originalSRC}
        alt=""
        onClick={() => {
          dispatch(setCurrentImage(originalSRC));
        }}
      />
      <button
        className={classes.image_close}
        onClick={removeImageFromGallery}
        value={originalSRC}
      >
        <span className={classes.icon__close}></span>
      </button>
    </li>
  ));

  return (
    <div className={classes.imageGalleryUploader}>
      <div className={classes.galleryContainer}>
        {images.length > 0 && <ul className={classes.images}>{imagePreview}</ul>}
        <ImageUploader label={'+'} onImageChangeHandler={addImageToGallery} />
      </div>
    </div>
  );
};
