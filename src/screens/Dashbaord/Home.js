import { Stack, VStack, Heading } from '@chakra-ui/layout';
import { CircularProgress, useToast } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAppointment } from '../../actions/appointment/appointment';
import { getUserSalon } from '../../actions/dashboard/dashboard';
import AppointmentsTable from '../../components/table/AppointmentsTable';
import BookingTable from '../../components/table/BookingTable';



const MyPaginate = styled(ReactPaginate).attrs({
    // You can redifine classes here, if you want.
    activeClassName: 'active', // default to "disabled"
  })`
    margin-bottom: 2rem;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: none;
    padding: 1rem 5rem;
    
    li a {
      border-radius: 7px;
      padding: 0.1rem 1rem;
      border: 1px solid gray;
      cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
       border-color: transparent;
    }
    li.active a {
      background-color: #D70F64;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;
  




const Home = () => {
    const { user } = useSelector(state => state.Auth);
    const { userSalon } = useSelector(state => state.Dashboard);

    const { appointment, loading } = useSelector(state => state.Appointment);

    const nav = useNavigate();

    const toast = useToast();

    const dispatch = useDispatch();

    useEffect(() => {
        const payload = {
            user_id: user?.data?.user?._id,
            salon_id: userSalon?.data?._id,
        };
        if (user && !userSalon) {

            dispatch(getUserSalon(payload, toast, nav));

        }
        // if (userSalon) {
            dispatch(getAppointment(payload, toast, nav));
        // } 
    }, [user, userSalon]);



     // paginataion

  const [currentItems, setCurrentItems] = useState([]);
  console.log(
    '🚀 ~ file: Appointments.js ~ line 46 ~ Appointments ~ currentItems',
    currentItems
  );
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 4;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(appointment?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(appointment?.length / 4));
  }, [itemOffset, appointment]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % appointment.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  // paginataion

    // useEffect(() => {
    //     if (userSalon) {
    //         const callAPI = () => {
    //             console.log('call is going');

    //             const data = {
    //                 user_id: user?.data?.user?._id,
    //                 salon_id: userSalon?.data?._id,
    //             };
    //             dispatch(getAppointment(data, toast, nav));

    //         };
    //         const clearSetInterval = setInterval(() => {
    //             callAPI()
    //         }, 3000);

    //         return () => {
    //             clearInterval(clearSetInterval)
    //         };
    //     }
    // }, [userSalon]);


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
                {/* <HStack flex={'1'} bgColor={'white'} p={{ base: '4', lg: "8" }} justifyContent={'space-between'} > */}
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
                    {/* <FontAwesomeIcon /> */}
                    <Heading>Employees</Heading>
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
                    onClick={() => nav('/services')}
                >
                    <Heading>Services</Heading>
                </VStack>
            </Stack>
            {loading ? (
                <CircularProgress isIndeterminate={true} />
            ) : (
                <>
                <AppointmentsTable appointment={currentItems} />
                <MyPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
            </>
            )}
            {/* <BookingTable /> */}
        </VStack>
    );
};

export default Home;
