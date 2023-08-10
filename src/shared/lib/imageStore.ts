import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ImageStoreStateType = {
  images: Array<ImageType>
  error: string 
  currentImage:string
}

export type ImageType = {
    src: string
    type: string
    name: string
    hash: string
    size: number
}

const initialState: ImageStoreStateType = {
  images: [],
  error: '',
  currentImage:''
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
        const filteredImages = state.images.filter(({src}, i) => {
          if (action.payload.src === state.currentImage) {
            if (i - 1 >= 0) {
              state.currentImage = state.images[i - 1].src;
            } else if (i + 1 < state.images.length) {
              state.currentImage = state.images[i + 1].src;
            }
          }
          return src != action.payload.src
        });
        state.images = filteredImages;
    },

    

    currentImage:(state, action:PayloadAction<{src:string}>)=>{
        state.currentImage = action.payload.src
    }
  },
})

// Action creators are generated for each case reducer function
export const { addImage, removeImage, currentImage} = imageSlice.actions

export default imageSlice.reducer