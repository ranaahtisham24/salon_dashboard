import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainRoutes from './utils/routes/MainRoutes';
import theme from './assets/theme/Theme';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <ChakraProvider theme={theme}>
      <MainRoutes />
    </ChakraProvider>
  );
}

export default App;
