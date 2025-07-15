import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  profileImage: '',
  age:'',
     profiles: [],
     favoriteGenres: [],
      selectedProfile: null,
};

export const userSlices = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserCredentials: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
     setUserImage: (state, action) => {
    state.profileImage = action.payload;
  },
  setAgeGroup: (state, action) => {
    state.age = action.payload;
  },
    setUserProfiles: (state, action) => {
  state.profiles = action.payload;
},
setFavoriteGenres: (state, action) => {
      state.favoriteGenres = action.payload;
    },
   removeGenre:(state,action)=>{
    state.favoriteGenres=state.favoriteGenres.filter((genre)=>genre.title!==action.payload)
   },
setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },

    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
       state.selectedProfile = null;
    },
  },
});

export const { setUserName, setUserCredentials, clearUser,setUserProfiles,setUserImage,setAgeGroup,setFavoriteGenres,removeGenre, setSelectedProfile,} = userSlices.actions;
export default userSlices.reducer;
