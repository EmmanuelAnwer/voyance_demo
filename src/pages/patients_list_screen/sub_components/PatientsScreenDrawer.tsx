import { Drawer, Paper, Box , Typography, Select, MenuItem, Slider, SelectChangeEvent, Divider} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import {toggleDrawer} from '../state_mangement/drawer_slice';
import { RootState } from "../../../store";
import { setAge, setGender } from '../state_mangement/filters_slice';

/**
 * Patients Screen's drawer
 * 
 * Container contains all the patient's screen design design and states and contains age, gender filters
 * 
 * @returns Returns the drawer block of the patient's screen
 */
const PatientsScreenDrawer = () => {
  // Gets the enable drawer value from the store
  const isDrawerOpened = useSelector((state: RootState) => state.drawer.isDrawerEnabled);
  // Gets gender value from the store
  const gender = useSelector((state: RootState) => state.filter.gender);
  // Gets gender value from the age
  const age = useSelector((state: RootState) => state.filter.age);

  // Create const for redux dispatcher to dispatch redux actions
  const dispatcher = useDispatch();

  /**
   * Closes the drawer
   * 
   * Calls the redux toggleDrawer action to close the drawer, normally drawer is opened before calling this function
   */
  function closeTheDrawer(){
    dispatcher(toggleDrawer());
  }

  /**
   * Handles gender has been changed from the `Select` component
   * 
   * Calls the setGender action to updates the gender field, normally target's value is string so it cast it
   */
  const handleGenderChanged = (event: SelectChangeEvent) => {
    dispatcher(setGender(event.target.value as string));
  };

  /**
   * Handles age range has been changed from the `Slider` component
   * 
   * Calls the setGender action to updates the age field, normally target's value is list of numbers so it cast it
   */
  const handleChangeSlider = (_: Event, newValue: number | number[]) => {
    dispatcher(setAge(newValue as number[]));
  };

  return (
    <Box>
        <Drawer
            anchor="left"
            open={isDrawerOpened}
            onClose={()=>{closeTheDrawer()}}
        >
        <Paper
        sx={
            {
            width: '300px',
            height: '100%',
            p: '20px'
            }
        }
        >
          <Box display='flex' justifyContent='space-between' alignItems='center' margin='10px 0px'>
            <Typography fontWeight='700'>
              Gender            
            </Typography>
            <Select
              value={gender}
              onChange={handleGenderChanged}
              sx={{
                minWidth: 100
              }}
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </Box>
          <Divider/>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography fontWeight='700'>
              Age            
            </Typography>
            <Box width='150px'>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={age}
                onChange={handleChangeSlider}
                valueLabelDisplay="auto"
              />
            </Box>
          </Box>
        </Paper>
    </Drawer>
  </Box>
  );
};

export default PatientsScreenDrawer;
