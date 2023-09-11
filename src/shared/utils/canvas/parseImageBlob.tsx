import { ImageType, MimeType } from '@/redux/store/imageSlice/types/store';

export const parseImageBlob = (blob: Blob): ImageType => {
    const { name, size, type: rawType } = blob;
    const type = rawType as MimeType;
    const src = URL.createObjectURL(blob);
    const filters = {};
    const originalSRC = src;
    return {
        src,
        originalSRC,
        type,
        name,
        size,
        filters
    };
};
