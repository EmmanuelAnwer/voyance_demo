import { Box } from '@mui/material';
import noImage from '../../assets/no_page_found.webp';

const NoPageScreen = () => {
  return (
    <Box 
    width='100vw' 
    height='100vh' // Ensures the parent container takes full viewport height
    display='flex' 
    justifyContent='center' 
    alignItems='center'
  >
    <img 
      src={noImage} 
      alt="Image Not Supported"  
      style={{ 
        objectFit: 'contain', 
        maxHeight: '100%', 
        maxWidth: '100%' 
      }}
    />
  </Box>
  );
};

export default NoPageScreen
