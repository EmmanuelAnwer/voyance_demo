import { createSlice } from "@reduxjs/toolkit"

/**
 * Interface for the drawer state
 */
interface DrawerState{
    isDrawerEnabled: boolean
}

// Initializes initial state of the drawer
const initialState: DrawerState = {
    isDrawerEnabled: false
}

// Creates slice for the drawer contains its reducers and actions
const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers:{
        toggleDrawer: (state) => {
            state.isDrawerEnabled = ! state.isDrawerEnabled;
        }
    }
});

// Exports reducer and actions
export const { toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;