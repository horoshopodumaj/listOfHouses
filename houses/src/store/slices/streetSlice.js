import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedStreetId: null,
    streets: [],
    streetIds: [],
};

const slice = createSlice({
    name: "streets",
    initialState: { ...initialState },
    reducers: {
        setStreets(state, action) {
            state.streets = action.payload;
        },
        setSelectedStreetId(state, action) {
            state.selectedStreetId = action.payload;
        },
        setStreetIds(state, action) {
            state.streetIds = action.payload;
        },
    },
});

export const actions = slice.actions;

export default slice.reducer;
