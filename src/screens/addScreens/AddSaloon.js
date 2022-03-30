import React, { useEffect, useRef, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    addSalon,
    updateSalon,
    updateSalonLogo,
} from '../../actions/dashboard/dashboard';
import SuccessToaster from '../../utils/toaster/SuccessToaster';

const AddSaloon = ({ isUpdate }) => {
    const [image, setimage] = useState();

    const { user } = useSelector(state => state.Auth);
    const { loading, userSalon } = useSelector(state => state.Dashboard);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const NameRef = useRef();
    const AddressRef = useRef();
    const LatitudeRef = useRef();
    const LongitudeRef = useRef();
    const PhoneNumberRef = useRef();

    useEffect(() => {
        if (isUpdate && userSalon) {
            setimage(userSalon.data.profileImage);
            NameRef.current.value = userSalon.data.name;
            AddressRef.current.value = userSalon.data.address;
            LatitudeRef.current.value = userSalon.data.location.coordinates[0];
            LongitudeRef.current.value = userSalon.data.location.coordinates[1];
            PhoneNumberRef.current.value = userSalon.data.phoneNumber;
        }
    }, [isUpdate, userSalon]);
    const addSalonPayload = () => {
        const fd = new FormData();

        fd.append('user_id', user?.data?.user?._id);
        fd.append('salon_logo', image);
        fd.append('name', NameRef.current.value);
        fd.append('address', AddressRef.current.value);
        fd.append('phoneNumber', PhoneNumberRef.current.value);
        fd.append('latitude', LatitudeRef.current.value);
        fd.append('longitude', LongitudeRef.current.value);

        dispatch(addSalon(fd, toast, nav));
    };

    const editSalonPayload = () => {
        const payload = {
            user_id: user?.data?.user?._id,
            salon_id: userSalon?.data?._id,
            name: NameRef.current.value,
            address: AddressRef.current.value,
            phoneNumber: PhoneNumberRef.current.value,
            latitude: LatitudeRef.current.value,
            longitude: LongitudeRef.current.value,
        };
        dispatch(updateSalon(payload, toast, nav));
    };

    const submitHandler = e => {
        e.preventDefault();
        if (isUpdate) {
            editSalonPayload();
        } else {
            addSalonPayload();
        }
    };
    const updateSalonPicHandler = () => {
        const fd = new FormData();
        fd.append('user_id', user?.data?.user?._id);
        fd.append('salon_id', userSalon?.data?._id);
        fd.append('old_salon_logo', userSalon?.data?.salon_logo);
        fd.append('salon_logo', image);
        dispatch(updateSalonLogo(fd, toast));
    };

    const imageSelector = e => {
        setimage(e.target.files[0]);
        SuccessToaster(toast, `${e.target.files[0]?.name} is selected`);
        if (isUpdate) {
            updateSalonPicHandler();
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
                Add Salon
            </Text>
            <Box position={'relative'}>
                <Avatar size={'xl'} src={''} bgColor={'blue.700'} />
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
                            <Input required ref={NameRef} type={'text'} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Address</FormLabel>
                            <Input required ref={AddressRef} type={'text'} />
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input required ref={PhoneNumberRef} type={'tel'} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Latitude</FormLabel>
                            <Input required ref={LatitudeRef} />
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Longitude</FormLabel>
                            <Input required ref={LongitudeRef} />
                        </FormControl>
                        <FormControl visibility={'hidden'}>
                            {/* <FormLabel>Email</FormLabel>
                            <Input type={'email'} /> */}
                        </FormControl>
                    </Stack>

                    <Button isLoading={loading} type="submit" bgColor={'#d70f64'}
                        color={'white'}>
                        Add Salon
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
};

export default AddSaloon;
