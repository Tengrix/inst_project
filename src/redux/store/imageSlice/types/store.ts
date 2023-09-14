import { Crop } from 'react-image-crop';

import { RootStateType, ThunkAppDispatchType } from '@/redux/store';

export type AsyncConfigType = {
    dispatch: ThunkAppDispatchType;
    rejectWithValue: string;
    state: RootStateType;
};

export type ImageStoreStateType = {
    images: Array<ImageType>;
    error: string;
    currentImage: CurrentImageType;
    description: string;
};
export type MimeType = 'image/jpeg' | 'image/jpg' | 'image/png';

export type ImageType = {
    src: string;
    originalSRC: string;
    type: MimeType;
    name: string;
    hash?: string;
    size: number;
    filters: { [key: string]: string };
    crop?: Crop;
};

export type CurrentImageType = {
    src: string;
    hash: string;
};
