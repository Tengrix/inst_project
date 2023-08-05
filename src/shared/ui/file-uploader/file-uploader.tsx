import { useState } from 'react';
import { Button } from '../button';
import { TextField } from '../text-field/text-field';
import classes from './file-uploader.module.scss';
import Image from 'next/image';

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
};

export const ImageUploader = ({ label, ...rest }: ImageUploaderPropsType) => {
  const [image, setImage] = useState<any>();

  const onImageChangeHandler = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className={classes.imageUploader}>
      <Button fullWidth>
        <FileUploader label={label} onChange={onImageChangeHandler} {...rest} />
      </Button>
      {<img src={image} alt="test" width={100} height={100} />}
    </div>
  );
};
