import { addImage, removeImage, setCurrentImage } from '@/redux/store/imageSlice/imageSlice';
import { Button } from '@/shared/ui/button';
import { ImageUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import classes from '@/pages/add-post/components/ImageEditor/NavbarItems/Gallery/ImageGallery.module.scss';
import {parseImageBlob} from "@/shared/utils/parseImageBlob";

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
