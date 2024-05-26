import { useDispatch, useSelector } from "react-redux";
import {Paper, Container, Fade, InputBase, Box, Collapse } from "@mui/material";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import { setName } from '../state_mangement/filters_slice';
import { RootState } from "../../../store";

/**
 * Patients Screen's search bar
 * 
 * Container contains all the patient's screen search bar design and states
 * 
 * @returns Returns the search bar block of the patient's screen
 */
const PatientsScreenSearchBar = () => {
  // Gets enable search value from the store
  const enableSearch = useSelector((state: RootState) => state.search.enableSearch);

  // Create const for redux dispatcher to dispatch redux actions
  const dispatcher = useDispatch();

  // Initializes empty string to save text getting from `InputBase` in it
  let searchString = "";

  /**
   * Handles on submit `InputBase` component
   *  
   * It handles on submit `InputBase` component by checking if it contains any letter it updates name in the store
   * if the input is empty it set the name by undefined
   */
  function onSubmit(): void{
    // Checks if the text empty
    if(searchString.trim() === ""){
      // Sets name with `undefined`
      dispatcher(setName(undefined));
      return;
    }
    // Sets name with the input after being trimmed
    dispatcher(setName(searchString.trim()));
  }
  
  /**
   * Updates searchString with the input base on input base changed
   * 
   * Updates the searchString with the input base, this is essential to get the last value of input base after submit.
   * 
   * @param value string Contains the input label after being changed
   */
  function setSearchString(value: string){
    searchString = value;
  }
  return (
    <Box>
      <Collapse in={enableSearch} timeout={300}>
        <Fade in={enableSearch} timeout={300}>
          <Container sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop:'10px', marginBottom: '10px'}}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
              onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                onChange={(e) => { setSearchString(e.target.value); }}
                placeholder="Search For Specific Patient Name"
              />
              <SearchSharpIcon sx={{ color: 'grey', m: '10px' }} />
            </Paper>
          </Container>
        </Fade>
      </Collapse>
    </Box>
  );
}

export default PatientsScreenSearchBar
