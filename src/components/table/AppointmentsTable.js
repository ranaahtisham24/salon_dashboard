import React, { useEffect } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Avatar,
    Box,
} from '@chakra-ui/react';

import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    editAppointment,
    getAppointment,
} from '../../actions/appointment/appointment';

const AppointmentsTable = ({ appointment }) => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.Auth);

    const changeStatusHandler = (booking_id, booking_status) => {
        const payload = {
            booking_id,
            booking_status,
            user_id: user?.data?.user?._id,
        };
        dispatch(editAppointment(payload));
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
                <TableCaption>Last booked appointments</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Time</Th>
                        <Th>Service</Th>
                        <Th>Employee</Th>
                        <Th>Customer</Th>
                        <Th>Status</Th>
                        <Th>Phone</Th>
                        <Th>Address</Th>
                        <Th>Service Price</Th>
                        <Th>Discount Price</Th>
                        <Th>Total Price</Th>
                        {/* <Th>Profile</Th> */}
                        {/* <Th>Action</Th> */}
                    </Tr>
                </Thead>
                <Tbody>
                    {appointment?.map((data, index) => (
                        <Tr key={index}>
                            <Td>{new Date(data?.booking_time)?.toLocaleDateString()}</Td>
                            <Td>{new Date(data?.booking_time)?.toLocaleTimeString()}</Td>
                            <Td>{data?.serviceName[0]?.service_name}</Td>
                            <Td>{data?.employeeName[0]?.firstName}</Td>
                            <Td>{data?.user_name}</Td>
                            <Td>
                                <Menu>
                                    <MenuButton>
                                        <Button>{data.booking_status}</Button>
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem
                                            display={
                                                data.booking_status === 'Scheduled' ? 'none' : null
                                            }
                                            onClick={() => changeStatusHandler(data._id, 'Scheduled')}
                                        >
                                            Scheduled
                                        </MenuItem>
                                        <MenuItem
                                            display={
                                                data.booking_status === 'Cancelled' ? 'none' : null
                                            }
                                            onClick={() => changeStatusHandler(data._id, 'Cancelled')}
                                        >
                                            Cancelled
                                        </MenuItem>
                                        <MenuItem
                                            display={
                                                data.booking_status === 'Completed' ? 'none' : null
                                            }
                                            onClick={() => changeStatusHandler(data._id, 'Completed')}
                                        >
                                            Completed
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                            <Td>{data?.user_phoneNo}</Td>
                            <Td>{data?.address}</Td>
                            <Td>{data?.service_price}</Td>
                            <Td>{data?.discount_price}</Td>
                            <Td>{data?.total_price}</Td>
                            {/* <Td>
                                <Avatar
                                    src={
                                        process.env.REACT_APP_BASE_URL +
                                        data?.userData[0]?.profileImage
                                    }
                                />
                            </Td> */}
                            {/* <Td>
                                <Menu>
                                    <MenuButton>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Edit</MenuItem>
                                        <MenuItem>Disable</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td> */}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default AppointmentsTable;
