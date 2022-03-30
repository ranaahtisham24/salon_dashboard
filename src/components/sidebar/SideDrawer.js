import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  return (
    <>
      <Button
        display={{ base: 'inherit', lg: 'none' }}
        colorScheme="blue"
        onClick={onOpen}
      >
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Salon on Phone</DrawerHeader>

          <DrawerBody>
            <VStack spacing={'4'}>
              <VStack
                cursor={'pointer'}
                onClick={() => nav('/')}
                w="full"
                h="auto"
                p="4"
              >
                <Text>Dashboard</Text>
              </VStack>
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
