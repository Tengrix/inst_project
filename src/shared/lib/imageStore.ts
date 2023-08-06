import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ImageStoreStateType = {
  images: Array<{}>
}

const initialState: ImageStoreStateType = {
  images: [

  ],
}

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    addImage:(state,  action: PayloadAction<{ image:string}> )=> {
        state.images.push(action.payload) 
        console.log(current(state))
    },
    removeImage(state, action: PayloadAction<{ index: number }>) {
        state.images.filter((i)=>i !== action.payload.index)
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { addImage, removeImage } = imageSlice.actions

export default imageSlice.reducer