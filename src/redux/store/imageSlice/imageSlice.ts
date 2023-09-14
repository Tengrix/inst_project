import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Crop } from 'react-image-crop';

import { AsyncConfigType, ImageStoreStateType, ImageType } from '@/redux/store/imageSlice/types/store';

const initialState: ImageStoreStateType = {
    images: [],
    error: '',
    currentImage: {
        src: '',
        hash: ''
    },
    description: ''
};

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        addImage: (state, action: PayloadAction<ImageType>) => {
            if (state.images.length <= 10) {
                state.images.push(action.payload);
                state.currentImage.src = action.payload.originalSRC;
            }
        },

        removeImage: (state, action: PayloadAction<{ src: string }>) => {
            const filteredImages = state.images.filter(({ originalSRC }, i) => {
                if (action.payload.src === state.currentImage.src) {
                    if (i - 1 >= 0) {
                        state.currentImage.src = state.images[i - 1].originalSRC;
                        state.currentImage.hash = state.images[i - 1].originalSRC.replace(/^.*\//, '');
                    } else if (i + 1 < state.images.length) {
                        state.currentImage.src = state.images[i + 1].originalSRC;
                        state.currentImage.hash = state.images[i + 1].originalSRC.replace(/^.*\//, '');
                    }
                }
                return originalSRC !== action.payload.src;
            });
            state.images = filteredImages;
        },

        addFilterToCurrentImage: (state, action: PayloadAction<{ filterName: string; args: string }>) => {
            const { filterName, args } = action.payload;
            const index = state.images.findIndex(image => image.originalSRC === state.currentImage.src);
            if (index !== -1) {
                state.images[index].filters[filterName] = args;
            }
        },

        setCurrentImage: (state, action: PayloadAction<string>) => {
            state.currentImage.src = action.payload;
            state.currentImage.hash = action.payload.replace(/^.*\//, '');
        },

        setCrop: (state, action: PayloadAction<{ crop: Crop; src: string }>) => {
            state.images = state.images.map(image => {
                if (image.originalSRC === action.payload.src) {
                    return {
                        ...image,
                        crop: action.payload.crop
                    };
                }
                return image;
            });
        },
        setDescription: (state, action: PayloadAction<{ description: string }>) => {
            state.description = action.payload.description;
        },
        resetImageState: () => initialState
    },

    extraReducers: builder => {
        builder.addCase(createNewImageBlob.fulfilled, (state, action) => {
            const { newSRC, size } = action.payload;
            for (let i = 0; i < state.images.length; i++) {
                if (state.images[i].originalSRC === state.currentImage.src) {
                    state.images[i].src = newSRC;
                    state.images[i].size = size;
                    break;
                }
            }
        });
    }
});

// Action creators are generated for each case reducer function

export const {
    addImage,
    removeImage,
    addFilterToCurrentImage,
    setCurrentImage,
    setDescription,
    setCrop,
    resetImageState
} = imageSlice.actions;

export const { reducer: imageReducer } = imageSlice;

//thunks
export const createNewImageBlob = createAsyncThunk<
    { newSRC: string; size: number },
    { filterName: string; args: string },
    AsyncConfigType
>('image/createNewImageBlob', async (filter, thunkAPI) => {
    //const aspectRatio = +image.filters.crop;
    //const size = 64;
    thunkAPI.dispatch(addFilterToCurrentImage(filter));

    const state = thunkAPI.getState();
    const { currentImage, images } = state.images;

    const [{ src, originalSRC, type, filters }] = images.filter(
        (image: ImageType) => image.originalSRC === currentImage.src
    );

    if (src !== originalSRC) URL.revokeObjectURL(src);

    const blob = await fetch(originalSRC).then(r => r.blob());
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    //const canvas = new OffscreenCanvas(256, 256);
    //const ctx = offscreen.getContext("webgl");

    const { width, height } = bitmap;
    let outputWidth = width;
    let outputHeight = height;
    const imageAspectRatio = width / height;
    const aspectRatio = +filters.crop;

    const effects = filters.color;

    if (aspectRatio) {
        // if it's bigger than our target aspect ratio
        if (imageAspectRatio > aspectRatio) {
            outputWidth = height * aspectRatio;
        } else if (imageAspectRatio < aspectRatio) {
            outputHeight = width / aspectRatio;
        }
    }

    // calculate the position to draw the image at
    //const outputX = (outputWidth - width) * 0.5;
    //const outputY = (outputHeight - height) * 0.5;

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    //const ratio = Math.max(size / width, size / height)

    //const x = (size - (width * ratio)) / 2;
    //const y = (size - (height * ratio)) / 2;
    //ctx.filter = 'invert(1)';
    //ctx.filter = "grayscale(100%)";
    //console.log(width, height, outputWidth, outputHeight)

    if (ctx) {
        ctx.filter = effects && effects;

        ctx.drawImage(bitmap, 0, 0, outputWidth, outputHeight, 0, 0, outputWidth, outputHeight);
    }

    const newBlob = await new Promise<Blob>(resolve => canvas.toBlob(blob => blob && resolve(blob), type, 1));

    const newSRC = URL.createObjectURL(newBlob);
    const { size } = newBlob;

    return { newSRC, size };
});
