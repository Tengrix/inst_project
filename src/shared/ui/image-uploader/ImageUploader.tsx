import { ChangeEvent } from 'react';

import { TextField } from '@/shared/ui/text-field';

import { Button } from '../button';

import classes from './image-uploader.module.scss';

export type FileUploaderPropsType = {
    className?: string;
    label?: string;
    // eslint-disable-next-line no-unused-vars
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const FileUploader = ({ ...rest }: FileUploaderPropsType) => {
    return <TextField name="image" type="file" {...rest} />;
};

type ImageUploaderPropsType = {
    label: string;
    // eslint-disable-next-line no-unused-vars
    onImageChangeHandler?: (event: ChangeEvent<HTMLInputElement>) => void;
    btnVariant?: 'primary' | 'secondary' | 'outlined' | 'link';
};

export const ImageUploader = ({
    label,
    onImageChangeHandler,
    btnVariant = 'primary',
    ...rest
}: ImageUploaderPropsType) => {
    return (
        <div className={classes.imageUploader}>
            <Button fullWidth color="secondary" variant={btnVariant} type={'button'}>
                <FileUploader label={label} onChange={onImageChangeHandler} {...rest} />
            </Button>
        </div>
    );
};
