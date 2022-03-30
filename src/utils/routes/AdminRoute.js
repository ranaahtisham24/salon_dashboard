import React from 'react';
import { HStack, VStack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';

const AdminRoute = ({ children }) => {
  const { user } = useSelector(state => state.Auth);
  return (
    <>
      {user.data.user.role == 'admin' ? (
        <HStack
          alignItems={'flex-start'}
          spacing={'0'}
          bg="white"
          w="full"
          minH={'100vh'}
        >
          <Sidebar check={user.data.user.role}/>
          <VStack w="87%" minH="100vh" spacing={'8'} pb={'2'}>
            <Header check={user.data.user.role}/>
            {children}
          </VStack>
        </HStack>
      ) : (
        <Navigate to={'/signin'} />
      )}
    </>
  );
};

export default AdminRoute;
