import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import SearchOffIcon from '@mui/icons-material/SearchOff';

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../store';
import { toggleSearch } from "../state_mangement/search_slice";
import { toggleDrawer } from "../state_mangement/drawer_slice";

/**
 * Patients Screen's app bar
 * 
 * Container contains all the patient's screen app bar design and states
 * 
 * @returns Returns the Appbar block of the patient's screen
 */
const PatientsScreenAppBar = () => {
  // Gets the enable search value from store
  const enableSearch = useSelector((state: RootState) => state.search.enableSearch);

  // Create const for redux dispatcher to dispatch redux actions
  const dispatch = useDispatch();

  /**
   * Handles on click search icon procedure
   */
  function onClickSearchIcon(): void{
    dispatch(toggleSearch());
  }

    /**
   * Handles on click filter icon procedure
   */
  function onClickFilterIcon(): void{
    dispatch(toggleDrawer());
  }

  return (
    <AppBar component="nav">
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, textWrap: "nowrap" }}
      >
        Patients Demo App
      </Typography>
      <Box component="div" sx={{display: 'flex'}}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onClickSearchIcon}
          color="inherit"
        >
          {enableSearch ? <SearchOffIcon/>: <SearchSharpIcon/>}
        </IconButton>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={onClickFilterIcon}
          color="inherit"
        >
          <FilterAltOutlinedIcon/>
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
  );
};

export default PatientsScreenAppBar;
