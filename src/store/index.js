import { configureStore } from "@reduxjs/toolkit";
import favouritePhotosReducer from "./favouritePhotos";

export default configureStore({
  reducer: {
    favouritePhotos: favouritePhotosReducer,
  },
});
