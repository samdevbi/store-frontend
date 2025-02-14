import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../lib/types/screen";

const initialState: HomePageState = {
    newJewelry: [],
    trendJewelry: [],
    topUsers: [],
};

const homePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setTrendJewelry: (state, action) => {
            state.trendJewelry = action.payload;
        },
        setNewJewelry: (state, action) => {
            state.newJewelry = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

export const { setTrendJewelry, setNewJewelry, setTopUsers } = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;