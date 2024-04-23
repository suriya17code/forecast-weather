import {createSlice}from '@reduxjs/toolkit'

const initialState={
   cityname:"chennai",
}
  export const weatherSlice =createSlice({
   name:'weather',
   initialState,
   reducers:{
      addcityname:(state,action)=>{
          state.cityname = action.payload;
      }

   },

  })
  export const allcity = (state) => state.weather;
 export const{addcityname} = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
