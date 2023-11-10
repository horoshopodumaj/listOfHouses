import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    houses: [],
    selectedHouseId: null,
};

const slice = createSlice({
    name: "houses",
    initialState: { ...initialState },
    reducers: {
        setHouses(state, action) {
            state.houses = action.payload;
        },
        setSelectedHouseId(state, action) {
            state.selectedHouseId = action.payload;
        },
    },
});

export const actions = slice.actions;

export default slice.reducer;
