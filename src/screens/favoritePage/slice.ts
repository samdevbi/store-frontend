import { createSlice } from "@reduxjs/toolkit";
import { FavoritePageState } from "../../lib/types/screen";

const initialState: FavoritePageState = {
    like: [],
    save: [],
};

const favoritePageSlice = createSlice({
    name: "favoritePage",
    initialState,
    reducers: {
        setLike: (state, action) => {
            state.like = action.payload;
        },
        setSave: (state, action) => {
            state.save = action.payload;
        },
    },
});

export const { setLike, setSave } = favoritePageSlice.actions;

const FavoritePageReducer = favoritePageSlice.reducer;
export default FavoritePageReducer;