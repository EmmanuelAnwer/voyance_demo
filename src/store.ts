import { configureStore } from '@reduxjs/toolkit';

import searchReducer from './pages/patients_list_screen/state_mangement/search_slice';
import drawerReducer from './pages/patients_list_screen/state_mangement/drawer_slice';
import filterReducer from './pages/patients_list_screen/state_mangement/filters_slice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    drawer: drawerReducer,
    filter: filterReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store;