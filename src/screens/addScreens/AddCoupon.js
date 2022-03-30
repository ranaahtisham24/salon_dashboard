import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import {
    addCoupans,
    editCoupans,
    getCoupansbyId,
    resetCoupansById,
} from '../../actions/coupans/coupans';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
const AddCoupon = () => {
    const { user } = useSelector(state => state.Auth);

    const { loading, coupansById } = useSelector(state => state.Coupans);
    console.log(
        '🚀 ~ file: AddCoupon.js ~ line 21 ~ AddCoupon ~ coupansById',
        coupansById
    );

    const { employee } = useSelector(state => state.Employee);

    const { userSalon } = useSelector(state => state.Dashboard);

    const { appointmentById } = useSelector(state => state.Appointment);

    const [discountType, setdiscountType] = useState('');

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const couponCode = useRef();
    const usageLimit = useRef();
    const expirationDate = useRef();
    const limitPerUser = useRef();
    // const discountType = useRef();
    const percentageAmount = useRef();
    const fixedAmount = useRef();

    const { id } = useParams();
    console.log("🚀 ~ file: AddCoupon.js ~ line 53 ~ AddCoupon ~ id", id)

    useEffect(() => {
        const payload = {
            coupon_id: id,
            user_id: user?.data?.user?._id,
        };

        if (id) {
            dispatch(getCoupansbyId(payload, toast, nav));
        }
    }, [id]);

    useEffect(() => {
        if (coupansById !== null) {
            couponCode.current.value = coupansById?.couponCode;
            usageLimit.current.value = coupansById?.usageLimit;
            expirationDate.current.value = new Date(
                coupansById?.expirationDate
            ).toLocaleDateString();
            limitPerUser.current.value = coupansById?.limitPerUser;
            setdiscountType(coupansById?.discountType);
            // discountType.current.value = coupansById?.discountType;
            if (coupansById?.percentageAmount > 0) {
                console.log(
                    '🚀 ~ file: AddCoupon.js ~ line 73 ~ useEffect ~ coupansById?.percentageAmount',
                    coupansById?.percentageAmount
                );
                setdiscountType('percentageAmount');
                percentageAmount.current.value = coupansById.percentageAmount;
            }
            if (coupansById?.fixedAmount > 0) {
                console.log(
                    '🚀 ~ file: AddCoupon.js ~ line 77 ~ useEffect ~ coupansById?.fixedAmount',
                    coupansById.fixedAmount
                );
                setdiscountType('fixedAmount');
                fixedAmount.current.value = coupansById.fixedAmount
            }
        }
        return () => {
            dispatch(resetCoupansById())
        }
    }, [coupansById]);


    const addCoupansPayload = payload => {
        dispatch(addCoupans(payload, toast, nav));
    };

    const editCoupansPayload = payload => {
        dispatch(editCoupans(payload, toast, nav));
    };

    const submitHandler = e => {
        e.preventDefault();

        const payload = {
            user_id: user?.data?.user?._id,
            salon_id: userSalon?.data?._id,
            couponCode: couponCode.current?.value,
            expirationDate: expirationDate.current?.value,
            usageLimit: +usageLimit.current?.value,
            limitPerUser: +limitPerUser.current?.value,
            discountType: discountType,
            percentageAmount: +percentageAmount.current?.value,
            fixedAmount: +fixedAmount.current?.value,
        };

        if (id) {
            payload.coupon_id = id;
            editCoupansPayload(payload);
        } else {
            addCoupansPayload(payload);
        }
    };
    return (
        <VStack
            p="8"
            w="90%"
            h="auto"
            bgColor={'white'}
            borderRadius={'lg'}
            spacing={'4'}
            boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
        >
            <Text fontWeight={'bold'} fontSize={'2xl'}>
                Add Coupan
            </Text>
            <form onSubmit={submitHandler} style={{ width: '100%', height: 'auto' }}>
                <VStack spacing={'4'}>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Coupon Code</FormLabel>
                            <Input ref={couponCode} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Expiration Date</FormLabel>
                            <Input ref={expirationDate} type={'date'} />
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Usage Limit</FormLabel>
                            <Input ref={usageLimit} type={'number'} />
                            {/* <Checkbox>
                                Coupan has no usage limit
                            </Checkbox> */}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Limit Per User</FormLabel>
                            <Input ref={limitPerUser} type={'number'} />
                            {/* <Checkbox>
                                Coupan has no Limit Per User
                            </Checkbox> */}
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Discount Type</FormLabel>
                            <Select
                                _focus={{ color: 'black' }}
                                value={discountType}
                                onChange={e => setdiscountType(e.target.value)}
                            >
                                <option value={'percentageAmount'}>Percentage amount</option>
                                <option value={'fixedAmount'}>Fixed amount</option>
                            </Select>
                        </FormControl>
                        <FormControl
                            d={discountType === 'percentageAmount' ? 'initial' : 'none'}
                        >
                            <FormLabel>Percentage amount</FormLabel>

                            <Input ref={percentageAmount} type={'number'} />
                        </FormControl>
                        <FormControl
                            d={discountType !== 'percentageAmount' ? 'initial' : 'none'}
                        >
                            <FormLabel>Fixed amount</FormLabel>

                            <Input ref={fixedAmount} type={'number'} />
                        </FormControl>
                    </Stack>
                    {/* <Stack
                        alignItems={'flex-start'}
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Coupanss</FormLabel>
                            <Select>
                                <option>Hair Cut</option>
                            </Select>
                        </FormControl>
                        <FormControl visibility={'hidden'} isRequired>
                            <FormLabel>Coupanss</FormLabel>
                            <Select>
                                <option>Hair Cut</option>
                            </Select>
                        </FormControl>
                    </Stack> */}
                    <Button isLoading={loading} type="submit" bgColor={'#d70f64'}
                        color={'white'}>
                        {id ? 'Edit Coupans' : 'Add Coupans'}
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
};

export default AddCoupon;
