import { Box, CssBaseline, Toolbar } from '@mui/material';

import PatientsScreenAppBar from './sub_components/PatientsScreenAppBar';
import PatientsScreenTable from './sub_components/PatientsScreenTable';
import PatientsScreenDrawer from './sub_components/PatientsScreenDrawer';
import PatientsScreenSearchBar from './sub_components/PatientsScreenSearchBar';
import PatientsScreenFilters from './sub_components/PatientsScreenFilters';

export default function PatientListsScreen() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%'}}>
      <CssBaseline />
      <PatientsScreenAppBar/>
      <PatientsScreenDrawer/>

      <Box component="main" sx={{width: '100%'}}>
        <Toolbar />
        <PatientsScreenSearchBar/>
        <PatientsScreenFilters/>
        <PatientsScreenTable/>
      </Box>
    </Box>
  );
}