import { combineReducers, configureStore } from "@reduxjs/toolkit";
import flatsSlice from "./slices/flatsSlice";
import housesSlice from "./slices/housesSlice";
import streetSlice from "./slices/streetSlice";

const rootReducer = combineReducers({
    streets: streetSlice,
    houses: housesSlice,
    flats: flatsSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});
