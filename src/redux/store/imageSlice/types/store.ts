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
    title: string;
    description: string;
};

export type ImageType = {
    src: string;
    originalSRC: string;
    type: string;
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
