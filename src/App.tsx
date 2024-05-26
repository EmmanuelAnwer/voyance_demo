
import NoPageScreen from './pages/no_page_screen/NoPageScreen';
import PatientImageScreen from './pages/patient_image_screen/PatientImageScreen';
import PatientsListScreen from './pages/patients_list_screen/PatientsListScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PatientsListScreen />}></Route>
        <Route path='/imageScreen' element={<PatientImageScreen/>}/>
        <Route path="*" element={<NoPageScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
