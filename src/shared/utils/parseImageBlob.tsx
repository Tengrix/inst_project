import {ImageType} from "@/redux/store/imageSlice/types/store";

export const parseImageBlob = (blob: Blob) : ImageType => {
    const { name, size, type } = blob;
    const src = URL.createObjectURL(blob);
    const filters = {};
    const originalSRC = src;
    return {
        src,
        originalSRC,
        type,
        name,
        size,
        filters,
    }
}