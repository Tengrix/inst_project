import { ChangeEvent } from 'react';
import { Button } from '../button';
import { TextField } from '../text-field/text-field';
import classes from './file-uploader.module.scss';

export type FileUploaderPropsType = {
  className?: string;
  label?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FileUploader = ({ className, ...rest }: FileUploaderPropsType) => {
  return <TextField name="image" type="file" {...rest} />;
};

type ImageUploaderPropsType = {
  label: string;
  onImageChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ImageUploader = ({ label, onImageChangeHandler, ...rest }: ImageUploaderPropsType) => {
  return (
    <div className={classes.imageUploader}>
      <Button fullWidth color="secondary">
        <FileUploader label={label} onChange={onImageChangeHandler} {...rest} />
      </Button>
    </div>
  );
};
