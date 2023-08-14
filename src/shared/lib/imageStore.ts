import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ImageStoreStateType = {
  images: Array<ImageType>
  error: string 
  currentImage: {
    src: string
    hash: string
  }
}

export type ImageType = {
    src: string
    originalSRC: string
    type: string
    name: string
    hash: string
    size: number
    filters: {[key: string]: number | string}
}

export const createNewImageBlob = createAsyncThunk(
  'image/createNewImageBlob',
  async (filter: { filterName: string, args: number | string }, thunkAPI) => {
    //const aspectRatio = +image.filters.crop;
    //const size = 64;
    thunkAPI.dispatch(addFilterToCurrentImage(filter));

    const state = thunkAPI.getState();
    const { currentImage, images} = state.images;

    const [{src, originalSRC, type, filters}] = images.filter((image: ImageType) => image.originalSRC === currentImage.src);

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

    const effects = filters.color

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

    canvas.width = outputWidth
    canvas.height = outputHeight

    //const ratio = Math.max(size / width, size / height)

    //const x = (size - (width * ratio)) / 2;
    //const y = (size - (height * ratio)) / 2;
    //ctx.filter = 'invert(1)';
    //ctx.filter = "grayscale(100%)";
    //console.log(width, height, outputWidth, outputHeight)

   if(effects){
    ctx.filter=effects
   }

    ctx.drawImage(bitmap, 0, 0, outputWidth, outputHeight, 0, 0, outputWidth, outputHeight);
   
    const newBlob = await new Promise(resolve => canvas.toBlob(resolve, type, 1));

    const newSRC = URL.createObjectURL(newBlob);
    const { size } = newBlob;

    return {newSRC, size}
  }
)


const initialState: ImageStoreStateType = {
  images: [],
  error: '',
  currentImage: {
    src: '',
    hash: ''
  }
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    addImage: (state,  action: PayloadAction<ImageType>) => {
     if (state.images.length < 8) {
       console.log('STATE - ', current(state))
        state.images.push(action.payload) 
        console.log(current(state))
        if (state.error) state.error = '';
      } else {
        state.error = 'Error'
      }
    },

    removeImage: (state, action: PayloadAction<{ src: string }>) => {
      console.log("CLICK ")
        const filteredImages = state.images.filter(({originalSRC}, i) => {
          if (action.payload.src === state.currentImage.src) {
            console.log("CLICK ")
            if (i - 1 >= 0) {
              state.currentImage.src = state.images[i - 1].originalSRC;
              state.currentImage.hash = state.images[i - 1].originalSRC.replace(/^.*\//, '');
            } else if (i + 1 < state.images.length) {
              state.currentImage.src = state.images[i + 1].originalSRC;
              state.currentImage.hash = state.images[i + 1].originalSRC.replace(/^.*\//, '');
            }
          }
          return originalSRC !== action.payload.src
        });
        state.images = filteredImages;
    },

    addFilterToCurrentImage: (state, action: PayloadAction<{ filterName: string, args: number | string }>) => {
      const {filterName, args} = action.payload;
      for (let i = 0; i < state.images.length; i++) {
        if (state.images[i].originalSRC === state.currentImage.src) {
          console.log("APPLY FILTERS ---", filterName);
          state.images[i].filters[filterName] = args;
          break;
        }
      }
    },

    currentImage:(state, action:PayloadAction<string>)=>{
        state.currentImage.src = action.payload;
        state.currentImage.hash = action.payload.replace(/^.*\//, '');
    }
  },

  extraReducers: (builder) => {
      builder.addCase(createNewImageBlob.fulfilled, (state, action) => {
        const {newSRC, size} = action.payload;
        for (let i = 0; i < state.images.length; i++) {
          if (state.images[i].originalSRC === state.currentImage.src) {
            state.images[i].src = newSRC;
            state.images[i].size = size;
            break;
          }
        }
      })
    }
})

// Action creators are generated for each case reducer function
export const { addImage, removeImage, addFilterToCurrentImage, currentImage} = imageSlice.actions

export default imageSlice.reducer