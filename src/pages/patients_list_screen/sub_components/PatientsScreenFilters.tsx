import { Box, Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { setAge, setGender, setName } from '../state_mangement/filters_slice';
import { isFiltersChanged, isNameChanged, isAgeChanged, isGenderChanged } from '../helper_functions';

/**
 * Patients Screen's filters 
 * 
 * Container contains all the patient's screen filter design and states.
 * 
 * @returns Returns the filters block of the patient's screen
 */
const PatientsScreenFilters = () => {
    // Gets the filters value from store
    const filters = useSelector((state: RootState) => state.filter);
    
    // Gets gender value from the store
    const dispatch = useDispatch();

    /**
     * Resets age to its default
     * 
     * It updates the age with its default value `[0,100]` using redux action
     */
    function clearAge(){
        dispatch(setAge([0, 100]));
    }
    
    /**
     * Resets gender to its default
     * 
     * It resets the gender with its default value `undefined` using redux action
     */
    function clearGender(){
        dispatch(setGender(undefined));
    }

    /**
     * Resets name to its default
     * 
     * It resets the name with its default value `undefined` using redux action
     */
    function clearName(){
        dispatch(setName(undefined));
    }

    /**
     * Resets all filter to their default
     * 
     * It resets all filter with its default value `name: undefined, age: [0, 100], gender: undefined` using redux action
     */
    function onClickClearAll(){
        clearAge();
        clearGender();
        clearName();
    }

  return (
    <Box display='block'>
        {isFiltersChanged(filters) &&
        <Box display='flex' alignContent='center' width='100%' flexDirection='column' sx={{marginTop: '10px'}}>
            <Box display='flex' justifyContent='center'>
                {isNameChanged(filters) && <Button startIcon ={<CloseIcon/>} variant='contained' color='primary' sx={{m: '0px 5px'}} onClick={clearName}>{'name: ' + filters.name} </Button>}
                {isAgeChanged(filters) && <Button startIcon ={<CloseIcon/>} variant='contained' color='primary' onClick={clearAge} sx={{m: '0px 5px'}}>{'age: ' + filters.age[0] + ' - ' + filters.age[1]}</Button>}
                {isGenderChanged(filters) && <Button startIcon ={<CloseIcon/>} variant='contained' color='primary' onClick={clearGender} sx={{m: '0px 5px'}}>{filters.gender}</Button>}
            </Box>
            <Box display='flex' justifyContent='center'>
            <Button onClick={onClickClearAll}>
                Clear All
            </Button>
            </Box>
        </Box> }
    </Box>
  );
};

export default PatientsScreenFilters;
