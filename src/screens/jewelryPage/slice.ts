import { createSlice } from "@reduxjs/toolkit";
import { JewelryPageState } from "../../lib/types/screen";


const initialState: JewelryPageState = {
    owner: null,
    jewelryDetail: null,
    jewelries: [],
};

const jewelryPageSlice = createSlice({
    name: "jewelriesPage",
    initialState,
    reducers: {
        setOwner: (state, action) => {
            state.owner = action.payload;
        },
        setJewelryDetail: (state, action) => {
            state.jewelryDetail = action.payload;
        },
        setJewelries: (state, action) => {
            state.jewelries = action.payload;
        },
    },
});

export const { setOwner, setJewelryDetail, setJewelries } = jewelryPageSlice.actions;

const JewelryPageReducer = jewelryPageSlice.reducer;
export default JewelryPageReducer;