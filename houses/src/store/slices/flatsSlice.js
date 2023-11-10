import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    flats: {},
    selectedFlatId: null,
    selectedFlat: {},
};

const slice = createSlice({
    name: "flats",
    initialState: { ...initialState },
    reducers: {
        setFlats(state, action) {
            state.flats = action.payload;
        },
        setSelectedFlatId(state, action) {
            state.selectedFlatId = action.payload;
        },
        setSelectedFlat(state, action) {
            state.selectedFlat = action.payload;
        },
        deleteCliet(state, action) {
            state.flats.clients = state.flats.clients.filter((x) => x.id !== action.payload);
        },
    },
});

export const actions = slice.actions;

export default slice.reducer;
