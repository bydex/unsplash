import { createSlice } from "@reduxjs/toolkit";

export const favouritePhotos = createSlice({
  name: "favouritePhotos",
  initialState: {
    photos: [],
  },
  reducers: {
    toggleLikePhoto: (state, action) => {
      if (!state.photos.some((item) => item.id === action.payload.id)) {
        state.photos.push(action.payload);
      } else {
        state.photos = state.photos.filter(
          (photo) => photo.id !== action.payload.id
        );
      }
    },
  },
});

export const selectFavouritePhotoIdList = (state) =>
  state.favouritePhotos.photos.map((photo) => photo.id);

// Action creators are generated for each case reducer function
export const { toggleLikePhoto } = favouritePhotos.actions;

export default favouritePhotos.reducer;
