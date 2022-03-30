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
    useToast,
} from '@chakra-ui/react';

import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CoupanTable = ({ coupans }) => {
    const nav = useNavigate();

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
                        <Th>Coupon Code</Th>
                        <Th>Discount</Th>
                        <Th>Per User</Th>
                        <Th>Usage</Th>
                        <Th>Services</Th>
                        <Th>Valid Until</Th>
                        {/* <Th>Status</Th> */}
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {coupans?.map((data, index) => (
                        <Tr key={index}>
                            <Td>{data.couponCode}</Td>
                            <Td>{data?.fixedAmount !== 0 ? `Rs. ${data?.fixedAmount}` : `${data.percentageAmount}%`}</Td>
                            <Td>{data?.limitPerUser}</Td>
                            <Td>{data?.usageLimit}</Td>
                            <Td>All Services</Td>
                            <Td>{new Date(data.expirationDate).toLocaleDateString()}</Td>
                            {/* <Td>
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
                            </Td> */}
                            <Td>
                                <Menu>
                                    <MenuButton>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={() => nav(`/coupons/${data._id}`)}>
                                            Edit
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

export default CoupanTable;
