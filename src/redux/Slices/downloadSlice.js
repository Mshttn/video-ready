import { createSlice } from "@reduxjs/toolkit";
import { userSlices } from "./userSlices";

const downloadSlice=createSlice({
    name:'downloadvd',
    initialState:{
        downloadvideos:[]
    },
    reducers:{
        addDownload:(state,action)=>{
            const exist = state.downloadvideos.find((video)=>video.id===action.payload.id);
            if(!exist){
                state.downloadvideos.unshift(action.payload);
            }

        },
         removeDownload: (state, action) => {
         state.downloadvideos = state.downloadvideos.filter(
        (video) => video.title !== action.payload
         );
          },
     clearDownloads: (state) => {
      state.downloadvideos = [];
    },
    }
})

export const {addDownload,removeDownload,clearDownloads}=downloadSlice.actions;
export default downloadSlice.reducer;