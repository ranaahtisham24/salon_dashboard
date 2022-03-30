import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import {
  Button,
  CircularProgress,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AppointmentsTable from '../../components/table/AppointmentsTable';
import { getAppointment } from '../../actions/appointment/appointment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SaloonTable from '../../components/table/SaloonTable';
import { getAllSalonList } from '../../actions/dashboard/dashboard';

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  width: 100%%;
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



const SaloonList = () => {

    const { user } = useSelector(state => state.Auth);
  const { salonList, loading } = useSelector(state => state.Dashboard);
  const toast = useToast();
  const nav = useNavigate();
  const dispatch = useDispatch();

  // search field
  const [searchedMembers, setSearchedMember] = useState('');

  const searchHandler = e => {
    const { value } = e.target;
    const arr = salonList?.data?.filter(u => u?.name?.includes(value));
    setSearchedMember(arr);
  };
  // search field

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
    setCurrentItems(salonList?.data?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(salonList?.data?.length / 4));
  }, [itemOffset,salonList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % salonList?.data?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  // paginataion

  useEffect(() => {
        console.log('call is going');

        const data = {
          user_id: user?.data?.user?._id
        };
        dispatch(getAllSalonList(data, toast, nav));
    
  }, [SaloonList]);

  return (
    <VStack
      VStack
      w="full"
      minH={'90vh'}
      p={{ base: '4', lg: '8' }}
      spacing={'4'}
    >
      <Flex alignItems={'center'} w="full">
        <Text fontWeight={'bold'}>Saloons ({salonList?.data?.length})</Text>
        <Spacer />
        <Button
          onClick={() => nav('/addadminsalon')}
          bgColor={'#d70f64'}
          color={'white'}
        >
          + Add Saloon
        </Button>
      </Flex>
      <VStack
        w="full"
        h={'full'}
        bgColor={'white'}
        borderRadius={'lg'}
        p={{ base: '2', lg: '4' }}
      >
        <Flex alignItems={'center'} w="full">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              w="90%"
              type="tel"
              placeholder="Search here"
              onChange={searchHandler}
            />
          </InputGroup>
          <Spacer />
        </Flex>
        {loading ? (
          <CircularProgress isIndeterminate={true} />
        ) : searchedMembers?.length > 0 ? (
          <>
            <SaloonTable salonList={searchedMembers} />
            <MyPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
          </>
        ) : (
          <>
            <SaloonTable salonList={currentItems} />

            <MyPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
            {/* <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            /> */}
          </>
        )}
      </VStack>
    </VStack>
  
  )
}

export default SaloonList