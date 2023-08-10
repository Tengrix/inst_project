import { useEffect, useState } from 'react';
import { Button } from '../button';
import { TextField } from '../text-field/text-field';
import classes from './file-uploader.module.scss';
import Image from 'next/image';
import { addImage, currentImage, removeImage } from '@/shared/lib/imageStore';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store';

export type FileUploaderPropsType = {
  className?: string;
  label?: string;
  onChange?: (event: any) => void;
};

const FileUploader = ({ className, ...rest }: FileUploaderPropsType) => {
  return <TextField name="image" type="file" {...rest} />;
};

type ImageUploaderPropsType = {
  label: string;
  onImageChangeHandler?: (event: any) => void;
};

export const ImageUploader = ({ label, onImageChangeHandler, ...rest }: ImageUploaderPropsType) => {
  return (
    <div className={classes.imageUploader}>
      <Button fullWidth>
        <FileUploader label={label} onChange={onImageChangeHandler} {...rest} />
      </Button>
      {/* {<img src={image} alt="test" width={100} height={100} />} */}
    </div>
  );
};

export const ImageGalleryUploader = ({
  label,
  onImageChangeHandler,

  ...rest
}: ImageUploaderPropsType) => {
  const dispatch = useDispatch();
  const images = useAppSelector((state) => state.images.images);

  const addImageToGallery = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const { name, size, type } = event.target.files[0];
      const src = URL.createObjectURL(event.target.files[0]);
      const image = {
        name,
        size,
        type,
        src,
        get hash() {
          return this.src.replace(/^.*\//, '')
        }
      };
      dispatch(addImage({ ...image }));
      dispatch(currentImage({ src }));
    }
  };
  const removeImageFromGallery = (event: any) => {
    if (event.target.value) {
      dispatch(removeImage({ src: event.target.value }));
    }
  };

  return (
    <div className={classes.galleryContainer}>
      {images.length > 0 && (
        <ul className={classes.images}>
          {images.map(({ src, hash }) => (
            <li key={src} className={classes.images__image}>
              <img
                key={src}
                src={src}
                id={hash}
                alt=""
                onClick={() => {
                  dispatch(currentImage({ src }));
                }}
              />
              <Button
                className={classes.images__image__close}
                onClick={removeImageFromGallery}
                value={src}
              >
                X
              </Button>
            </li>
          ))}
        </ul>
      )}
      <Button className={classes.btn} variant="outlined">
        <FileUploader label={'+'} {...rest} onChange={addImageToGallery} />
      </Button>
    </div>
  );
};
