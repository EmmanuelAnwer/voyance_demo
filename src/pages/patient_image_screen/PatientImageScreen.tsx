import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RemoteDataSource } from './data_sources/remote_data_source';

import imageNotFound from '../../assets/image_not_found.jpg';

const PatientImageScreen = () => {
  const location = useLocation();
  const remoteDataSource = new RemoteDataSource;
  const patientIdParam = new URLSearchParams(location.search).get('patientId');

  const [patientUrl, setPatientUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(()=>{
    if(patientIdParam !==undefined){
      remoteDataSource.getPatientImageUrl(patientIdParam!).then((getPatientImageUrl: string | undefined) => {
        setIsLoading(false);
        if(getPatientImageUrl === undefined) return;

        setPatientUrl(getPatientImageUrl);
      })
    }
    else{
      setIsLoading(false);
    }

  }, [])
  

  return (
    <Box 
    width='100vw' 
    height='100vh' // Ensures the parent container takes full viewport height
    display='flex' 
    justifyContent='center' 
    alignItems='center'
  >
  {
  !isLoading ?  <img 
      src={patientUrl ? patientUrl : imageNotFound} 
      alt="Image Not Supported"  
      style={{ 
        objectFit: 'contain', 
        maxHeight: '100%', 
        maxWidth: '100%' 
      }}
    /> : <CircularProgress/>
  }
  </Box>
  );
};

export default PatientImageScreen;