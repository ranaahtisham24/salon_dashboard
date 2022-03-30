import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ check }) => {
  const nav = useNavigate();

  const { user } = useSelector(state => state.Auth);

  return (
    <VStack
      display={{ base: 'none', lg: 'inherit' }}
      position={'sticky'}
      top={'0'}
      bottom={'0'}
      w="13%"
      minH="100vh"
      backgroundColor="#d70f64"
      justifyContent={'start'}
      spacing={'4'}
      color={'white'}
    >
      <VStack
        cursor={'pointer'}
        onClick={() => nav('/')}
        w="full"
        h="auto"
        p="4"
        mt="1rem"
      >
        <Text>Dashboard</Text>
      </VStack>

      {check ? (
        <VStack
          cursor={'pointer'}
          onClick={() => nav('/saloonlist')}
          w="full"
          h="auto"
          p="4"
          pt='2'
        >
          <Text>Saloon List</Text>
        </VStack>
      ) : (
        <>
          <VStack
            cursor={'pointer'}
            onClick={() => nav('/appointment')}
            w="full"
            h="auto"
            p="4"
          >
            <Text>Appointments</Text>
          </VStack>
          <VStack
            cursor={'pointer'}
            onClick={() => nav('/employee')}
            w="full"
            h="auto"
            p="4"
          >
            <Text>Employees</Text>
          </VStack>
          <VStack
            cursor={'pointer'}
            onClick={() => nav('/services')}
            w="full"
            h="auto"
            p="4"
          >
            <Text>Services</Text>
          </VStack>
          <VStack
            cursor={'pointer'}
            onClick={() => nav('/coupons')}
            w="full"
            h="auto"
            p="4"
          >
            <Text>Coupons</Text>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default Sidebar;
