import { Stack, VStack, Heading } from '@chakra-ui/layout';
import { CircularProgress, useToast } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const { user } = useSelector(state => state.Auth);
    const { userSalon } = useSelector(state => state.Dashboard);

    const { appointment, loading } = useSelector(state => state.Appointment);

    const nav = useNavigate();

    const toast = useToast();

    const dispatch = useDispatch();



    return (
        <VStack
            p="4"
            width="full"
            height="auto"
            bg="white"
            justifyContent="center"
            alignItems="center"
            spacing={'8'}

        >
            <Stack
                color={'white'}
                spacing={'8'}
                alignItems={'center'}
                direction={{ base: 'column', lg: 'row' }}
                w="full"
                h={{ base: 'max-content', lg: '40vh' }}
                borderRadius={'lg'}
                justifyContent={'space-between'}

            >
                <VStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={{ base: 'full', lg: '30%' }}
                    h="100%"
                    bgColor={'#0000008c'}
                    p="4"
                    borderRadius={'lg'}
                >
                    <Heading>
                        Welcome
                        <br />
                        {user?.data?.user?.firstName + ' ' + user?.data?.user?.lastName}
                        <br />
                        to Salon on Phone
                    </Heading>
                </VStack>
                <VStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    w={{ base: 'full', lg: '30%' }}
                    h="100%"
                    bgColor={'#3f51b5'}
                    p="4"
                    borderRadius={'lg'}
                    cursor={'pointer'}
                    onClick={() => nav('/employee')}
                >
                    <Heading>
                        Total Salons
                        {' '} 
                    </Heading>
                </VStack>
                <VStack
                    width={'30%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    h="100%"
                    bgColor={'#3f51b5'}
                    p="4"
                    borderRadius={'lg'}
                    cursor={'pointer'}
                    onClick={() => nav('/services')}
                >
                    <Heading>Services</Heading>
                </VStack>
            </Stack>
            {/* {loading ? (
                <CircularProgress isIndeterminate={true} />
            ) : (
                <>
                <AppointmentsTable appointment={currentItems} />
            </>
            )} */}
        </VStack>
    );
};


export default AdminHome