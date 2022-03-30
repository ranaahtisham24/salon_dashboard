import { Avatar, Button, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideDrawer from '../sidebar/SideDrawer';
const Header = ({ check }) => {
  const nav = useNavigate();

  const { user } = useSelector(state => state.Auth);

  return (
    <HStack
      minH={'10vh'}
      w="full"
      position={'sticky'}
      top={'0'}
      backgroundColor="white"
      // boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
      justifyContent={check ? 'flex-end' : 'space-between'}
      alignItems={'center'}
      px={'4'}
      boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
      zIndex={'1111111111111111111111111111111'}
    >
      {check ? (
        ''
      ) : (
        <Button
          display={{ base: 'none', lg: 'inherit' }}
          onClick={() => nav('/addappointment')}
          bgColor={'#d70f64'}
          color={'white'}
        >
          Book an Appointment +
        </Button>
      )}

      <SideDrawer />
      <HStack spacing={'2'}>
        <Menu>
          <MenuButton>
            <Avatar
              src={
                process.env.REACT_APP_BASE_URL + user?.data?.user?.profileImage
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => nav('/updatesalon')}>Your Salon</MenuItem>
            <MenuItem onClick={() => nav('/profile')}>Profile Setting</MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.clear();
                window.location.href = '/signin';
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        <Text display={{ base: 'none', lg: 'inherit' }} fontWeight={'semibold'}>
          {user?.data?.user?.firstName + ' ' + user?.data?.user?.lastName}
        </Text>
      </HStack>
    </HStack>
  );
};

export default Header;
