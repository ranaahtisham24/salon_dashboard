import React from 'react';
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
import { ChevronDownIcon } from '@chakra-ui/icons';

const BookingTable = () => {
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
                        <Th>Customer</Th>
                        <Th>Status</Th>
                        <Th>Profile</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>January 4, 2022</Td>
                        <Td>10:00 am</Td>
                        <Td>Men's Haircut</Td>
                        <Td>Customer Example</Td>
                        <Td>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    Approved
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Approved</MenuItem>
                                    <MenuItem>Pending</MenuItem>
                                    <MenuItem>Cancled</MenuItem>
                                    <MenuItem>Rejected</MenuItem>
                                </MenuList>
                            </Menu>
                        </Td>
                        <Td>
                            <Avatar src="" />
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
};

export default BookingTable;
