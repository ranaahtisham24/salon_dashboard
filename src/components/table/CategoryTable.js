import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Avatar,
    Text,
    HStack,
    useToast,
    Box,
} from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCategory } from '../../actions/category/category';

const CategoryTable = ({ category }) => {

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.Auth);

    const deleteHandler = p => {
        const payload = {
            category_id: p,
            user_id: user?.data?.user?._id,
        };
        dispatch(deleteCategory(payload, toast, nav));
    };

    return (
        <Box w={'full'} overflowX={'auto'}>
            <Table
                bgColor={'white'}
                borderRadius={'lg'}
                variant="simple"
                w="full"
                h={'auto'}
            >
                <Thead>
                    <Tr>
                        <Th>Category Name</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {category?.map((data, index) => (
                        <Tr key={index}>
                            <Td>
                                <Text>{data.name}</Text>
                            </Td>

                            <Td>
                                <Menu>
                                    <MenuButton>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => nav(`/category/${data?._id}`)}>
                                            Edit
                                        </MenuItem>
                                        <MenuItem>Disable</MenuItem>
                                        <MenuItem onClick={() => deleteHandler(data?._id)}>
                                            Delete
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default CategoryTable;
