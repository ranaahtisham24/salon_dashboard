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
import { useNavigate, useParams } from 'react-router-dom';
import {
    addAdminSalon,
    updateSalon,
    updateSalonLogo,
} from '../../actions/dashboard/dashboard';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import { getSalonbyId, resetSalonById } from '../../actions/coupans/coupans';
import Mapp from '../../components/location/Map';


const AddAdminSalon = ({ isUpdate }) => {


    const [image, setimage] = useState();

    const { user } = useSelector(state => state.Auth);
    // const { loading, userSalon } = useSelector(state => state.Dashboard);
    // console.log("🚀 ~ file: AddAdminSalon.js ~ line 33 ~ AddAdminSalon ~ userSalon", userSalon)
    const { loading ,salonData } = useSelector(state => state.Coupans)
    console.log('55555555', salonData)

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const NameRef = useRef('');
    console.log("22222222 nameRef", NameRef)
    const AddressRef = useRef('');
    const LatitudeRef = useRef('');
    const LongitudeRef = useRef('');
    const PhoneNumberRef = useRef('');

    const { id } = useParams();
    console.log("🚀 ~ file: AddAdminSalon.js ~ line 50 ~ AddAdminSalon ~ id 444444444444", id)

    useEffect(() => {
        const payload = {
            salon_id: id,
        };
        if (id) {
            dispatch(getSalonbyId(payload, toast, nav));
        }
    }, [id]);

    useEffect(() => {
        if (salonData) {
            setimage(salonData?.salon_logo);
            NameRef.current.value = salonData?.name;
            console.log("22222222 useEffect Nameref", NameRef.current.value)
            AddressRef.current.value = salonData?.address;
            LatitudeRef.current.value = salonData?.location.coordinates[0];
            LongitudeRef.current.value = salonData?.location.coordinates[1];
            PhoneNumberRef.current.value = salonData?.phoneNumber;
        }
        
        
    }, [salonData]);
    const addSalonPayload = () => {
        const fd = new FormData();

        fd.append('user_id', user?.data?.user?._id);
        fd.append('salon_logo', image);
        fd.append('name', NameRef.current.value);
        fd.append('address', AddressRef.current.value);
        fd.append('phoneNumber', PhoneNumberRef.current.value);
        fd.append('latitude', LatitudeRef.current.value);
        fd.append('longitude', LongitudeRef.current.value);

        console.log('22222222 add salon',fd)

        dispatch(addAdminSalon(fd, toast, nav));
    };

    const editSalonPayload = () => {
        const payload = {
            user_id: user?.data?.user?._id,
            salon_id: salonData?._id,
            name: NameRef.current.value,
            address: AddressRef.current.value,
            phoneNumber: PhoneNumberRef.current.value,
            latitude: LatitudeRef.current.value,
            longitude: LongitudeRef.current.value,
        };

        console.log('22222222 editsalon', payload)

        dispatch(updateSalon(payload, toast, nav));
    };

    const submitHandler = e => {
        e.preventDefault();
        if (isUpdate) {
            editSalonPayload();
        } else {
            addSalonPayload();
        }
        dispatch(resetSalonById())
    };
    const updateSalonPicHandler = () => {
        const fd = new FormData();
        fd.append('user_id', user?.data?.user?._id);
        fd.append('salon_id', salonData?._id);
        fd.append('old_salon_logo', salonData?.salon_logo);
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


    const [clicks, setClicks] = useState('')
    console.log("🚀 ~ file: AddAdminSalon.js ~ line 136 ~ AddAdminSalon ~ clicks", clicks)
    const [showMap, setShowMap] = useState(false)
    const onClick = (e) =>{
        setShowMap(true)
        setClicks({...clicks, e})
    }

    // const [isLocation, setLocation] = useState(false)
    const locationHandler = (obj) =>{
        console.log('7777777777',obj)
        // setLocation(true)

        LatitudeRef.current.value = obj?.lat;
        LongitudeRef.current.value = obj?.lng;
    }

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
                            <Input required ref={AddressRef} type={'text'}/>
                        </FormControl>
                    </Stack>
                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input required ref={PhoneNumberRef} type={'tel'}/>
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

                    <Stack
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                    >
                        <FormControl isRequired>
                            <FormLabel>Location</FormLabel>
                            <Button onClick={onClick}>Add location</Button>
                        </FormControl>
                    </Stack>

                    {showMap && 
                    <Stack width={'100%'} height={'100vh'}>
                    <Mapp locationHandler={locationHandler}/>
                    </Stack>}

                    <Button isLoading={loading} type="submit" bgColor={'#d70f64'}
                        color={'white'}>
                            {isUpdate ? 'Update Salon' : 'Add Salon'}
                        
                    </Button>
                </VStack>
            </form>
        </VStack>
  )
}

export default AddAdminSalon