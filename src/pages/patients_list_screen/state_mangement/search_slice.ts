import { createSlice } from "@reduxjs/toolkit"

/**
 * Interface for the search state
 */
interface SearchState{
    enableSearch: boolean
}

// Initializes initial state of the search
const initialState: SearchState = {
    enableSearch: false
}

// Creates slice for the search contains its reducers and actions
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers:{
        toggleSearch: (state) => {
            state.enableSearch = ! state.enableSearch;
        }
    }
});

// Exports reducer and actions
export const { toggleSearch } = searchSlice.actions;
export default searchSlice.reducer;