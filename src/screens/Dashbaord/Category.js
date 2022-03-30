import React, { useEffect } from 'react';
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
import EmployeeTable from '../../components/table/EmployeeTable';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee } from '../../actions/employee/employee';
import { getallCategory } from '../../actions/category/category';
import CategoryTable from '../../components/table/CategoryTable';

const Category = () => {
    const { user } = useSelector(state => state.Auth);

    const { userSalon } = useSelector(state => state.Dashboard);

    const { category, loading } = useSelector(state => state.Category);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            const data = {
                user_id: user?.data?.user?._id,
                salon_id: userSalon?.data?._id,
            };
            dispatch(getallCategory(data, toast, nav));
        }
    }, [user]);
    return (
        <VStack w="full" minH={'90vh'} p={{ base: '4', lg: '8' }} spacing={'4'}>
            <Flex alignItems={'center'} w="full">
                <Text fontWeight={'bold'}>Category ({category?.length})</Text>
                <Spacer />
                <Button onClick={() => nav('/addcategory')} bgColor={'#d70f64'}
                    color={'white'}>
                    + Add Category
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
                        <Input w="90%" type="tel" placeholder="Search here" />
                    </InputGroup>
                    <Spacer />
                    {/* <Menu>
                        <MenuButton>
                            <FontAwesomeIcon icon={faFilter} />
                            Filter
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Edit</MenuItem>
                            <MenuItem>Disable</MenuItem>
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu> */}
                </Flex>
                {loading ? (
                    <CircularProgress isIndeterminate={true} ringColor={'white'} />
                ) : (
                    <CategoryTable category={category} />
                )}
            </VStack>
        </VStack>
    );
};

export default Category;
