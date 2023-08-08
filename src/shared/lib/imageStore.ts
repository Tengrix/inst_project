import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ImageStoreStateType = {
  images: Array<ImageType>
  error: string 
  isShowGallery: boolean
  currentImage:string
}

export type ImageType = {
    src: string
    type: string
    name: string
    size: number
}

const initialState: ImageStoreStateType = {
  images: [],
  error: '',
  isShowGallery: false,
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
        const filteredImages = state.images.filter(({src}) => src != action.payload.src);
        state.images = filteredImages;
    },

    imageManager: (state,action:PayloadAction<{value:string}>)=>{
        if(action.payload.value === 'gallery'){
            state.isShowGallery = !state.isShowGallery
        }
    },
    currentImage:(state,action:PayloadAction<{src:string}>)=>{
        state.currentImage = action.payload.src
    }
  },
})

// Action creators are generated for each case reducer function
export const { addImage, removeImage, imageManager ,currentImage} = imageSlice.actions

export default imageSlice.reducer