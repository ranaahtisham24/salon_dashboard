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
import { deleteEmployee } from '../../actions/employee/employee';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({ employee }) => {
    console.log(
        '🚀 ~ file: EmployeeTable.js ~ line 25 ~ EmployeeTable ~ employee',
        employee
    );
    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.Auth);

    const deleteHandler = p => {
        const payload = {
            employee_id: p,
            user_id: user?.data?.user?._id,
        };
        dispatch(deleteEmployee(payload, toast, nav));
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
                        <Th>Employee</Th>
                        <Th>Email</Th>
                        <Th>Phone</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {employee?.map((data, index) => (
                        <Tr key={index}>
                            <Td>
                                <HStack>
                                    <Avatar
                                        src={process.env.REACT_APP_BASE_URL + data?.profileImage}
                                    />
                                    <Text>{data?.firstName + ' ' + data?.lastName}</Text>
                                </HStack>
                            </Td>
                            <Td>{data?.email}</Td>
                            <Td>{data?.phoneNumber}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => nav(`/employee/${data?._id}`)}>
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

export default EmployeeTable;
