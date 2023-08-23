import { ChangeEvent } from 'react';
import { Button } from '../button';
import { TextField } from '@/shared/ui/text-field';
import classes from 'src/shared/ui/image-uploader/image-uploader.module.scss';

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
  btnVariant?: 'primary' | 'secondary' | 'outlined' | 'link';
};

export const ImageUploader = ({ label, onImageChangeHandler,btnVariant = 'primary', ...rest }: ImageUploaderPropsType) => {
  return (
    <div className={classes.imageUploader}>
      <Button fullWidth color="secondary" variant={btnVariant} type={'button'}>
        <FileUploader label={label} onChange={onImageChangeHandler} {...rest} />
      </Button>
    </div>
  );
};
