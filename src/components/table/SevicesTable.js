import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
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
import { deleteService } from '../../actions/service/services';

const ServicesTable = ({ services }) => {
    const { loading } = useSelector(state => state.Services);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.Auth);

    const deleteHandler = p => {
        const payload = {
            service_id: p,
            user_id: user?.data?.user?._id,
        };
        dispatch(deleteService(payload, toast, nav));
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
                        <Th>Name</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        {/* <Th>Employees</Th> */}
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {services?.map((data, index) => (
                        <Tr key={index}>
                            <Td>
                                <HStack>
                                    <Avatar src={process.env.REACT_APP_BASE_URL + data.service_image} />
                                    <Text>{data.service_name}</Text>
                                </HStack>
                            </Td>
                            <Td>{data.duration}m</Td>
                            <Td>{data.total_price}</Td>
                            {/* <Td>
                                <HStack>
                                    <Avatar src="" />
                                    <Text>Gohar Ayoub</Text>
                                </HStack>
                            </Td> */}
                            <Td>
                                <Menu>
                                    <MenuButton>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => nav(`/service/${data._id}`)}>Edit</MenuItem>
                                        <MenuItem>Disable</MenuItem> 
                                        <MenuItem onClick={() => deleteHandler(data._id)}>
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

export default ServicesTable;
