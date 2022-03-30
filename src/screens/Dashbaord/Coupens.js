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
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import CoupanTable from '../../components/table/CoupanTable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCoupans } from '../../actions/coupans/coupans';



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




const Coupens = () => {
  const { user } = useSelector(state => state.Auth);

  const { userSalon } = useSelector(state => state.Dashboard);

  const { loading, coupans } = useSelector(state => state.Coupans);

  const toast = useToast();

  const nav = useNavigate();

  const dispatch = useDispatch();
  const [searchedMembers, setSearchedMember] = useState([]);

  const searchHandler = e => {
    const { value } = e.target;
    console.log(
      '🚀 ~ file: Appointments.js ~ line 35 ~ searchHandler ~ value',
      value
    );

    const arr = coupans?.filter(u => u?.couponCode?.includes(value));
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
    const endOffset = itemOffset + 2;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(coupans?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(coupans?.length / 2));
  }, [itemOffset, coupans]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 2) % coupans.length;
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
      dispatch(getCoupans(data, toast));
    // }
  }, []);
  return (
    <VStack w="full" minH={'90vh'} p={{ base: '4', lg: '8' }} spacing={'4'}>
      <Flex alignItems={'center'} w="full">
        <Text fontWeight={'bold'}>Coupons ({coupans?.length})</Text>
        <Spacer />
        <Button
          onClick={() => nav('/addcoupons')}
          bgColor={'#d70f64'}
          color={'white'}
        >
          + Add Coupons
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
                        <MenuButton >
                            <Button colorScheme={'blue'}>
                                <FontAwesomeIcon icon={faFilter} />
                                Filter
                            </Button>
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu> */}
        </Flex>
        {loading ? (
          <CircularProgress isIndeterminate />
        ) : searchedMembers?.length > 0 ? (
          <CoupanTable coupans={searchedMembers} />
        ) : (
          <>
          <CoupanTable coupans={currentItems} />
          <MyPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
            />
            </>
        )}
      </VStack>
    </VStack>
  );
};

export default Coupens;
