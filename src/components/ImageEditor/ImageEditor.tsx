import { ImageGalleryUploader } from '@/shared/ui/file-uploader/file-uploader';
import { useAppSelector } from '@/store';
import classes from './ImageEditor.module.scss';
import { ImageManager } from '../ImageManager/ImageManager';
import { addImage } from '@/shared/lib/imageStore';
import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';

export const ImageEditor = ({image}) => {
  const isShowGallery = useAppSelector((state) => state.images.isShowGallery);
  const dispatch = useDispatch();
  const icons = [
    { iconTitle: 'resize', className: 'icon_expand' },
    { iconTitle: 'scale', className: 'icon_maximizeOutline' },
    { iconTitle: 'gallery', className: 'icon_imageOutline' },
  ];
  const onImageChangeHandler = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const { name, size, type } = event.target.files[0];
      const src = URL.createObjectURL(event.target.files[0]);

      dispatch(addImage({ name, size, type, src }));
    }
  };

  return (
    <div className={classes.currentImageField}>
      {image && <img src={image} alt=""/>}
      {isShowGallery && (
        <div className={classes.imageGalleryUploader}>
          <ImageGalleryUploader label="gallery" onImageChangeHandler={onImageChangeHandler} />
        </div>
      )}
      <ImageManager icons={icons} />
    </div>
  );
};
