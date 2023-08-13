import { useEffect, useState } from 'react';
import { Button } from '../button';
import { TextField } from '../text-field/text-field';
import classes from './file-uploader.module.scss';
import Image from 'next/image';
import { addImage, currentImage, removeImage } from '@/shared/lib/imageStore';
import { useAppDispatch, useAppSelector } from '@/store';

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
  const dispatch = useAppDispatch();
  const images = useAppSelector((state) => state.images.images);

  const addImageToGallery = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      const blob = event.target.files[0];
      const { name, size, type } = blob;
      const src = URL.createObjectURL(blob);
      const filters = {}
      const originalSRC= src;
      const image = {
        name,
        size,
        type,
        src,
        originalSRC,
        filters,
        get hash() {
          return this.originalSRC.replace(/^.*\//, '')
        }
      };
      dispatch(addImage({ ...image }));
      dispatch(currentImage(originalSRC));
    }
  };
  const removeImageFromGallery = (e: any) => {
    if (e.currentTarget.value) {
      console.log("CLIKC<+++")
      dispatch(removeImage({ src: e.currentTarget.value }));
    }
  };

  return (
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
      <Button className={classes.btn} variant="outlined">
        <FileUploader label={'+'} {...rest} onChange={addImageToGallery} />
      </Button>
    </div>
  );
};
