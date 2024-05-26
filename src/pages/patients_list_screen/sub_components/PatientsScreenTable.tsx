import { FormControlLabel, IconButton, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, CircularProgress} from "@mui/material";
import ViewHeadlineRoundedIcon from '@mui/icons-material/ViewHeadlineRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RemoteDataSource } from "../data_sources/remote_data_source";
import { Patient } from "../models/patient";
import { RootState } from "../../../store";
import { isFiltersChanged } from "../helper_functions";
import { setAge, setGender, setName } from "../state_mangement/filters_slice";


// Initializes const array contains headers of the table
const columns: string[] = [
  'Name',
  'ID',
  'Age',
  'Gender',
  'Created At',
];

// Initializes const contains number of rows in each page, this is only useful in enabled pagination state 
const rowsPerPage = 5;

const PatientsScreenTable = () => {
  // Initializes remote data source object
  const remoteDataSource = new RemoteDataSource();

  // Initializes page number with zero, this is only useful in enabled pagination state
  const [page, setPage] = React.useState(0);
  // Initializes rows with undefined
  const [rows, setRows] = React.useState<Patient[] | undefined>();
  // Initializes total number of rows with zero
  const [totalNumberOfRows, setTotalNumberOfRows] = React.useState(0);
  // Initializes enable pagination with false
  const [enablePagination, setPagination] = React.useState(false);

  // Gets the filters from the store
  const filters = useSelector((state: RootState) => state.filter);
  
  /**
   * Act as initial state of the table and listen to filters
   * 
   * Gets all patients using init state and always listen to filters as if filters applied automatically 
   * enables pagination state, this is happened due to filters are not supported in all patients mode
   * 
   */
  useEffect(()=>{
    // Sets the rows with undefined
    setRows(undefined);
    // Sets the page to 0
    setPage(0);
    
    // Checks if the pagination enabled or the filters has been changed
    if(enablePagination || isFiltersChanged(filters)){
      // Enables pagination
      setPagination(true);
      // Calls pagination API and parser procedure
      callPagination(0);
    }
    else{
      // Calls all patients Api and parser
      callAllPatients();
    }
  }, [filters]);

  // Creates const for redux dispatcher to dispatch redux actions
  const dispatcher = useDispatch();

  /**
   * Handles page number changed
   * 
   * Updates the page number with the new page number and gets the new rows of the new page
   * 
   * @param newPage number contains the new page number
   */
  const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
      callPagination(newPage);
  };

  /**
   * Handles download icon clicked
   * 
   * Calls download patient image from remote data source.
   * 
   * @param patientId string contains the id of the patient
   */
  function downloadImage(patientId: string): void{
    remoteDataSource.downloadPatientImage(patientId);
  }

  /**
   * Gets all row of the patients using get all patients api
   * 
   * Gets all patients details and updates the row after getting them, this function is normally called at
   * init state and at turn off pagination 
   * 
   */
  function callAllPatients(){
    remoteDataSource.getAllPatients().then((response) => {
      setRows(response);
    });
  }
  
  /**
   * Gets the current page patients
   * 
   * Gets patients details of the current page and updates the row after getting them and updates the total number of rows
   * this function is normally called at page changed or enable pagination, also on filters changed 
   * 
   * @param pageNumber pageNumber contains the current page number
   */
  function callPagination(pageNumber: number){
    remoteDataSource.getPatientsWithPagination(pageNumber,filters,rowsPerPage).then((response)=>{
      // Gets the patients and total number of rows
      const [patients, totalNumberOfRows] = response;
      // Sets the patients in row
      setRows(patients);
      // Sets the total number of rows
      setTotalNumberOfRows(totalNumberOfRows);
    });
  }

  /**
   * Opens the patient image in new screen
   * 
   * @param patientId string id of the patient
   */
  function onTapOnPatient(patientId: string){
    window.open('/imageScreen?patientId=' + patientId, '_blank');
  }
  
  /**
   * Handles on pagination changed procedure
   * 
   * it Checks if pagination was closed, it calls pagination API and parser,
   * else it resets the filters and calls the all patients API and sets the pagination to it opposite value 
   */
  function onEnablePagination(){
    if(!enablePagination){
      callPagination(0);
    }
    else{
      dispatcher(setName(undefined));
      dispatcher(setAge([0,100]));
      dispatcher(setGender(undefined));
      callAllPatients();
    }
    setPagination(!enablePagination);
  }

  return (
    <>
    <TableContainer component={Paper} sx={
      {
        marginTop: '10px',
        marginBottom: '10px',
      }
    }>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((columnLabel) => (
                <TableCell
                  key={columnLabel}
                  align="center"
                  sx={
                    {
                      width: "16.66%"
                    }
                  }
                >
                  {columnLabel}
                </TableCell>
              ))}
              <TableCell
                align="center"
              >
                <ViewHeadlineRoundedIcon/>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            rows ? rows
              .slice(0, rows.length)
              .map((patientEntity) => {
                return (
                  <TableRow hover={true} tabIndex={-1} key={patientEntity.id} onClick={() => onTapOnPatient(patientEntity.id)}>
                    <TableCell align="center" height='89px'>
                      {patientEntity.name}
                    </TableCell>
                    <TableCell align="center" height='89px'>
                      {patientEntity.id}
                    </TableCell >
                    <TableCell align="center" height='89px'>
                      {patientEntity.age}
                    </TableCell>
                    <TableCell align="center" height='89px'>
                      {patientEntity.gender}
                    </TableCell>
                    <TableCell align="center" height='89px'>
                      {patientEntity.createdAt}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => {downloadImage(patientEntity.id); e.stopPropagation();}} sx={{zIndex: 1}}>
                        <GetAppRoundedIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }) : <TableCell colSpan={6} rowSpan={6}>
                <Box display="flex" justifyContent='center'>
                  <CircularProgress></CircularProgress>
                </Box>
              </TableCell>}
          </TableBody>
        </Table>
        {  
        enablePagination && <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={totalNumberOfRows}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />}
      </TableContainer>

    <Box display='flex' justifyContent={'end'}>
      <FormControlLabel
            label = "Enable Pagination"
            control={<Switch
              checked = {enablePagination}
              onChange={
                ()=> onEnablePagination()
              }    
            />
            }
          />
    </Box>
  </>  
  );
};

export default PatientsScreenTable;