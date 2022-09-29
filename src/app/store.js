import{configureStore} from "@reduxjs/toolkit"
import basketReducer from "../app/slices/basketSlice"

export const store = configureStore({
    reducer:{
        basket:basketReducer,
    },
})