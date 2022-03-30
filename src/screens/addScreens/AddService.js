import React, { useEffect, useRef, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Text,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    addService,
    editService,
    getServicebyId,
    resetServiceById,
    updateServicePic,
} from '../../actions/service/services';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import { getEmployee } from '../../actions/employee/employee';
import { getallCategory } from '../../actions/category/category';
const AddService = () => {
    const [image, setimage] = useState();

    const { user } = useSelector(state => state.Auth);

    const { loading, servicesById } = useSelector(state => state.Services);

    const { employee } = useSelector(state => state.Employee);

    const { userSalon } = useSelector(state => state.Dashboard);

    const { category } = useSelector(state => state.Category);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const serviceName = useRef();
    // const employeeIdRef = useRef();
    const durationRef = useRef();
    const descriptionRef = useRef();
    const discountPercentRef = useRef();
    const totalPriceRef = useRef();
    const categoryIdRef = useRef();
    const isDiscountRef = useRef();

    const { id } = useParams();

    useEffect(() => {
        const payload = {
            service_id: id,
            user_id: user?.data?.user?._id,
            salon_id: userSalon?.data?._id,
        };

        if (id) {
            dispatch(getServicebyId(payload, toast));
            dispatch(getEmployee(payload, toast, nav));
        }
    }, [id]);

    useEffect(() => {
        if (servicesById) {
            setimage(servicesById.profileImage);
            serviceName.current.value = servicesById.service_name;
            // employeeIdRef.current.value = servicesById.employees[0];
            categoryIdRef.current.value = servicesById.category_id;
            descriptionRef.current.value = servicesById.description;
            totalPriceRef.current.value = servicesById.total_price;
            discountPercentRef.current.value = servicesById.discount_percent;
            isDiscountRef.current.checked = servicesById.is_discount;
            durationRef.current.value = servicesById.duration;
        }
        return () => {
            dispatch(resetServiceById())
        }
    }, [servicesById]);

    const imageSelector = e => {
        setimage(e.target.files[0]);
        SuccessToaster(toast, `${e.target.files[0]?.name} is selected`);
        if (id) {
            updateServicePicHandler(e.target.files[0]);
        }
    };

    const updateServicePicHandler = (p) => {
        const fd = new FormData();
        fd.append('user_id', user?.data?.user?._id);
        fd.append('oldprofileImage', servicesById.service_image);
        fd.append('profileImage', p);
        fd.append('service_id', id);
        dispatch(updateServicePic(fd, toast, nav));
    };

    const addServicePayload = () => {
        if (image) {
        const fd = new FormData();

        fd.append('user_id', user?.data?.user?._id);
        fd.append('salon_id', userSalon?.data?._id);
        fd.append('service_image', image);
        fd.append('service_name', serviceName.current.value);
        // fd.append('employee_id', employeeIdRef.current.value);
        fd.append('category_id', categoryIdRef.current.value);
        fd.append('description', descriptionRef.current.value);
        fd.append('discount_percent', discountPercentRef.current.value);
        fd.append('duration', durationRef.current.value);
        fd.append('total_price', totalPriceRef.current.value);
        fd.append('is_discount', isDiscountRef.current.checked);

        dispatch(addService(fd, toast, nav));
        }
        else {
            ErrorToaster(toast, 'Kindly upload the service image');
        }
    };

    const editServicePayload = () => {
        const payload = {
            user_id: user?.data?.user?._id,
            service_id: id,
            // employee_id: employeeIdRef.current.value,
            category_id: categoryIdRef.current.value,
            duration: durationRef.current.value,
            service_name: serviceName.current.value,
            discount_percent: discountPercentRef.current.value,
            total_price: totalPriceRef.current.value,
            description: durationRef.current.value,
            is_discount: isDiscountRef.current.checked,
        };
        dispatch(editService(payload, toast, nav));
    };

    const submitHandler = e => {
        e.preventDefault();

            if (id) {
                editServicePayload();
            } else {
                addServicePayload();
            }

    };

    const durationArray = [
        '30min',
        '1h',
        '1h 30min',
        '2h',
        '2h 30min',
        '3h',
        '3h 30min',
        '4h',
        '4h 30min',
        '5h',
        '5h 30min',
        '6h',
        '6h 30min',
        '7h',
        '7h 30min',
        '8h',
        '8h 30min',
        '9h',
        '9h 30min',
        '10h',
        '10h 30min',
        '11h',
        '11h 30min',
        '12h',
        '12h 30min',
        '13h',
        '13h 30min',
        '14h',
        '14h 30min',
        '15h',
        '15h 30min',
        '16h',
        '16h 30min',
        '17h',
        '17h 30min',
        '18h',
    ];

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
                {id ? 'Edit Service' : 'Add Service'}
            </Text>
            <Box position={'relative'}>
                <Avatar
                    size={'xl'}
                    src={process.env.REACT_APP_BASE_URL + image}
                    bgColor={'blue.700'}
                />
                <Box position={'absolute'} bottom={'0'} right={'0'} color={'teal'}>
                    <FontAwesomeIcon
                        onClick={() => document.getElementById('pic').click()}
                        cursor={'pointer'}
                        size="lg"
                        icon={faCamera}
                    />
                </Box>
                <Input
                    id="pic"
                    display={'none'}
                    type={'file'}
                    onChange={e => imageSelector(e)}
                />
            </Box>
            <form onSubmit={submitHandler} style={{ width: '100%', height: 'auto' }}>
                <VStack spacing={'4'}>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input ref={serviceName} type={'text'} />
                      </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Category</FormLabel>
                            <Select
                                _focus={{ color: 'black' }}
                                placeholder={'Select category'}
                                ref={categoryIdRef}
                            >
                                {category?.map((data, index) => (
                                    <option key={index} value={data._id}>
                                        {data.name}
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
                          <FormLabel>Price</FormLabel>
                            <Input ref={totalPriceRef} type={'number'} />
                      </FormControl>
                      <FormControl isRequired>
                          <FormLabel>Duration</FormLabel>

                            <Select _focus={{ color: 'black' }} ref={durationRef}>
                                {durationArray?.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
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
                        {/* <FormControl isRequired>
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
                      </FormControl> */}
                      <FormControl isRequired>
                          <FormLabel>Percentage amount</FormLabel>
                            <Input ref={discountPercentRef} type={'number'} />
                            <Checkbox ref={isDiscountRef}>Allow Discount</Checkbox>
                      </FormControl>
                  </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl>
                          <FormLabel>Description</FormLabel>
                            <Textarea ref={descriptionRef} />
                      </FormControl>
                  </Stack>
                    <Button isLoading={loading} type="submit" bgColor={'#d70f64'}
                        color={'white'}>
                        {id ? 'Edit Service' : 'Add Service'}
                  </Button>
              </VStack>
          </form>
        </VStack>
    );
};

export default AddService;
