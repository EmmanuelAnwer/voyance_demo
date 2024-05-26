import { PayloadAction, createSlice } from "@reduxjs/toolkit"

/**
 * Interface for the filter state
 */
export interface FilterState{
    name: string | undefined;
    gender: string | undefined;
    age: number[];
}

// Initializes initial state of the filter state
export const filtersInitialState: FilterState = {
    name: undefined,
    gender: undefined,
    age: [0,100]
}

// Creates slice for the filters contains its reducers and actions
const filterSlice = createSlice({
    name: "drawer",
    initialState: filtersInitialState,
    reducers:{
        setName: (state, action: PayloadAction<string | undefined>) => {
            state.name = action.payload;
        },
        setGender: (state, action: PayloadAction<string | undefined>) => {
            state.gender = action.payload
        },
        setAge: (state, action: PayloadAction<number[]>) => {
            state.age = action.payload
        },
    }
});

export const { setName , setGender, setAge} = filterSlice.actions;

export default filterSlice.reducer;