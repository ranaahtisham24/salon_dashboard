import React, { useEffect, useRef } from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addAppointment } from '../../actions/appointment/appointment';
import { getallServices } from '../../actions/service/services';
import { getEmployee } from '../../actions/employee/employee';

const AddAppointments = () => {
    const { user } = useSelector(state => state.Auth);

    const { employee } = useSelector(state => state.Employee);

    const { userSalon } = useSelector(state => state.Dashboard);

    const { loading } = useSelector(state => state.Appointment);

    const { services } = useSelector(state => state.Services);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const serviceName = useRef();
    const employeeIdRef = useRef();
    const bookingDateRef = useRef();
    const bookingStatusRef = useRef();
    const nameRef = useRef();
    const addressRef = useRef();
    const genderRef = useRef();
    const customerPhoneRef = useRef();
    const isHomeRef = useRef();

    const { id } = useParams();

    useEffect(() => {
        const payload = {
            service_id: id,
            user_id: user?.data?.user?._id,
            salon_id: userSalon?.data?._id,
        };
        dispatch(getallServices(payload, toast, nav));
        dispatch(getEmployee(payload, toast, nav));
    }, []);

  // useEffect(() => {
  //     if (servicesById) {
  //         setimage(servicesById.profileImage);
  //         serviceName.current.value = servicesById.service_name;
  //         employeeIdRef.current.value = servicesById.employee_id;
  //         categoryIdRef.current.value = servicesById.category_id;
  //         descriptionRef.current.value = servicesById.description;
  //         totalPriceRef.current.value = servicesById.total_price;
  //         discountPercentRef.current.value = servicesById.discount_percent;
  //         isDiscountRef.current.checked = servicesById.is_discount;
  //     }
  // }, [servicesById]);

    const addServicePayload = payload => {
        dispatch(addAppointment(payload, toast, nav));
    };

    const editServicePayload = payload => {
        // dispatch(editAppointment(payload, toast, nav));
    };

    const submitHandler = e => {
        e.preventDefault();

        const payload = {
            user_id: user?.data?.user?._id,
            salon_id: userSalon?.data?._id,
            service_id: serviceName.current?.value,
            employee_id: employeeIdRef.current?.value,
            booking_time: bookingDateRef.current?.value,
            is_home_service: isHomeRef.current?.checked,
            booking_status: bookingStatusRef?.current?.value,
            user_name: nameRef?.current?.value,
            user_phoneNo: customerPhoneRef?.current?.value,
            user_gender: genderRef?.current?.value,
            address: addressRef?.current?.value
        };

        if (id) {
            // editServicePayload(payload);
        } else {
            addServicePayload(payload);
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
                {id ? 'Edit Booking' : 'Add Booking'}
            </Text>
            <form onSubmit={submitHandler} style={{ width: '100%', height: 'auto' }}>
                <VStack spacing={'4'}>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Service</FormLabel>
                            <Select
                                _focus={{ color: 'black' }}
                                placeholder={'Select Service'}
                                ref={serviceName}
                            >
                                {services?.map((data, index) => (
                                    <option key={index} value={data._id}>
                                        {data.service_name}
                                    </option>
                                ))}
                            </Select>
                            <Checkbox ref={isHomeRef}>Is Home Service</Checkbox>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Employee</FormLabel>
                            <Select
                                _focus={{ color: 'black' }}
                                ref={employeeIdRef}
                                placeholder="Select"
                            >
                                {employee?.map((data, index) => (
                                    <option key={index} value={data?._id}>
                                        {data?.firstName + ' ' + data?.lastName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Customer Name</FormLabel>
                            <Input ref={nameRef} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Customer Gender</FormLabel>
                            <Select placeholder='Select Gender' ref={genderRef}>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                                <option value={'others'}>others</option>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Customer Phone Number</FormLabel>
                            <Input ref={customerPhoneRef} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Customer Address</FormLabel>
                            <Input ref={addressRef} />
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Booking Status</FormLabel>
                            <Select
                                _focus={{ color: 'black' }}
                                placeholder={'Select Status'}
                                ref={bookingStatusRef}
                            >
                                <option value={'Scheduled'}>Scheduled</option>
                                <option value={'Cancelled'}>Cancelled</option>
                                <option value={'Completed'}>Completed</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Date</FormLabel>
                            <Input ref={bookingDateRef} type={'date'} />
                        </FormControl>
                    </Stack>
                    <VStack spacing={'4'}>
                        <Button isLoading={loading} type="submit" bgColor={'#d70f64'}
                            color={'white'}>
                            {id ? 'Edit Booking' : 'Add Booking'}
                        </Button>
                    </VStack>
                </VStack>
            </form>
        </VStack>
    );
};

export default AddAppointments;
