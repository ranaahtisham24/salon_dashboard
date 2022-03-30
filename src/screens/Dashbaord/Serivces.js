import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import {
  Button,
  CircularProgress,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ServicesTable from '../../components/table/SevicesTable';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getallServices } from '../../actions/service/services';
import { getallCategory } from '../../actions/category/category';

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
    background-color: #d70f64;
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

const Serivces = () => {
  const toast = useToast();

  const nav = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.Auth);
  const { loading, services } = useSelector(state => state.Services);
  const { userSalon } = useSelector(state => state.Dashboard);
  const [searchedMembers, setSearchedMember] = useState([]);

  const searchHandler = e => {
    const { value } = e.target;
    console.log(
      '🚀 ~ file: Appointments.js ~ line 35 ~ searchHandler ~ value',
      value
    );

    const arr = services?.filter(u => u?.service_name?.includes(value));
    console.log(
      '🚀 ~ file: Appointments.js ~ line 38 ~ searchHandler ~ arr',
      arr
    );
    setSearchedMember(arr);
  };

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
    setCurrentItems(services?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(services?.length / 4));
  }, [itemOffset, services]);

  const handlePageClick = event => {
    const newOffset = (event.selected * 4) % services.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  // paginataion

  useEffect(() => {
    // if (user) {
      const data = {
        user_id: user?.data?.user?._id,
        salon_id: userSalon?.data?._id,
      };
      dispatch(getallServices(data, toast, nav));
      dispatch(getallCategory(data, toast, nav));
    // }
  }, []);

  return (
    <VStack w="full" minH={'90vh'} p={{ base: '4', lg: '8' }} spacing={'4'}>
      <Button
        alignSelf={'flex-end'}
        onClick={() => nav('/category')}
        bgColor={'#d70f64'}
        color={'white'}
      >
        View Category
      </Button>
      <Flex alignItems={'center'} w="full">
        <Text fontWeight={'bold'}>Services ({services?.length})</Text>
        <Spacer />
        <Button
          onClick={() => nav('/addservice')}
          bgColor={'#d70f64'}
          color={'white'}
        >
          + Add Service
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
          {/* <Menu>
                        <MenuButton>
                            <Button colorScheme={'blue'}>
                                <FontAwesomeIcon icon={faFilter} />
                                Filter
                            </Button>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Disable</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu> */}
        </Flex>
        {loading ? (
          <CircularProgress isIndeterminate />
        ) : searchedMembers?.length > 0 ? (
          <ServicesTable services={searchedMembers} />
        ) : (
          <>
            <ServicesTable services={currentItems} />
            <MyPaginate pageCount={pageCount} onPageChange={handlePageClick} />
          </>
        )}
      </VStack>
    </VStack>
  );
};

export default Serivces;
