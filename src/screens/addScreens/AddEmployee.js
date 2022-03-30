import React, { useEffect, useRef, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
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
    addEmployee,
    editEmployee,
    getEmployeebyId,
    resetEmployeeById,
    updateEmployeePic,
} from '../../actions/employee/employee';
import SuccessToaster from '../../utils/toaster/SuccessToaster';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import { updateEmployeePicServices } from '../../services/employee';

const AddEmployee = () => {
    const [image, setimage] = useState();

    const { user } = useSelector(state => state.Auth);

    const { loading, employeeById } = useSelector(state => state.Employee);

    const { userSalon } = useSelector(state => state.Dashboard);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const firstNameRef = useRef();
    const SecondNameRef = useRef();
    const EmailRef = useRef();
    const PhoneNumberRef = useRef();
    const isActiveRef = useRef();

    const { id } = useParams();
    console.log('🚀 ~ file: AddEmployee.js ~ line 43 ~ AddEmployee ~ id', id);

    useEffect(() => {
        const payload = {
            employee_id: id,
            user_id: user?.data?.user?._id,
        };

        if (id) {
            dispatch(getEmployeebyId(payload, toast, nav));

        }
    }, [id]);

    useEffect(() => {
        if (employeeById) {
            setimage(employeeById.profileImage);
            firstNameRef.current.value = employeeById.firstName;
            SecondNameRef.current.value = employeeById.lastName;
            EmailRef.current.value = employeeById.email;
            PhoneNumberRef.current.value = employeeById.phoneNumber;
            isActiveRef.current.checked = employeeById.is_active;
        }
        return () => {
            dispatch(resetEmployeeById())
        }
    }, [employeeById]);

    const imageSelector = e => {
        setimage(e.target.files[0]);
        SuccessToaster(toast, `${e.target.files[0]?.name} is selected`);
        if (id) {
            updateEmployeePicHandler(e.target.files[0])
        }
    };

    const addEmployeePayload = () => {
        if (image) {
        const fd = new FormData();
        fd.append('user_id', user?.data?.user?._id);
        fd.append('salon_id', userSalon?.data?._id);
        fd.append('profileImage', image);
        fd.append('firstName', firstNameRef.current.value);
        fd.append('lastName', SecondNameRef.current.value);
        fd.append('phoneNumber', PhoneNumberRef.current.value);
        fd.append('email', EmailRef.current.value);
        fd.append('is_active', isActiveRef.current.checked);

        dispatch(addEmployee(fd, toast, nav));
        }
        else {
            ErrorToaster(toast, 'Kindly upload the employee image');
        }

    };

    const editEmployeePayload = () => {
        const payload = {
            employee_id: id,
            firstName: firstNameRef.current.value,
            lastName: SecondNameRef.current.value,
            email: EmailRef.current.value,
            is_active: isActiveRef.current.checked,
            phoneNumber: PhoneNumberRef.current.value,
        };
        dispatch(editEmployee(payload, toast, nav));
    };

    const updateEmployeePicHandler = (p) => {
        const fd = new FormData();
        fd.append('user_id', user?.data?.user?._id);
        fd.append('oldprofileImage', employeeById.profileImage);
        fd.append('profileImage', p);
        dispatch(updateEmployeePic(fd, toast, nav));
    };

    const submitHandler = e => {
        e.preventDefault();


            if (id) {
                editEmployeePayload();
            } else {
                addEmployeePayload();
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
                {id ? 'Edit Employee' : 'Add Employee'}
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
                    <Stack w="full" direction={{ base: 'column', lg: 'row' }} spacing={'8'}>
                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input ref={firstNameRef} type={'text'} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input ref={SecondNameRef} type={'text'} />
                        </FormControl>
                    </Stack>
                    <Stack w="full" direction={{ base: 'column', lg: 'row' }} spacing={'8'}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input ref={EmailRef} type={'email'} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone</FormLabel>
                            <Input ref={PhoneNumberRef} type={'tel'} />
                        </FormControl>
                    </Stack>
                    <Stack
                        p="4"
                        bgColor={'#5c6bc0'}
                        borderRadius={'lg'}
                        w="full"
                        direction={{ base: 'column', lg: 'row' }}
                        spacing={'8'}
                        justifyContent={'space-between'}
                    >
                        <Text fontWeight={'bold'}>Employee is active?</Text>
                        <Checkbox ref={isActiveRef} />
                    </Stack>
                    {/* <Stack w="full" direction={{ base: 'column', lg: 'row' }} spacing={'8'}>
                      <FormControl isRequired>
                          <FormLabel>Description</FormLabel>
                          <Textarea />
                      </FormControl>
                  </Stack> */}
                    {/* <Text fontWeight={'bold'} fontSize={'2xl'}>
                      Select Services{' '}
                  </Text>
                  <Stack
                      p="4"
                      bgColor={'#5c6bc0'}
                      borderRadius={'lg'}
                      w="full"
                      direction={{ base: 'column', lg: 'row' }}
                      spacing={'8'}
                      justifyContent={'space-between'}
                  >
                      <Text fontWeight={'bold'}>Hair Cutting</Text>
                      <Checkbox />
                  </Stack>
                  <Stack
                      p="4"
                      bgColor={'#5c6bc0'}
                      borderRadius={'lg'}
                      w="full"
                      direction={{ base: 'column', lg: 'row' }}
                      spacing={'8'}
                      justifyContent={'space-between'}
                  >
                      <Text fontWeight={'bold'}>Hair Cutting</Text>
                      <Checkbox />
                  </Stack>
                  <Stack
                      p="4"
                      bgColor={'#5c6bc0'}
                      borderRadius={'lg'}
                      w="full"
                      direction={{ base: 'column', lg: 'row' }}
                      spacing={'8'}
                      justifyContent={'space-between'}
                  >
                      <Text fontWeight={'bold'}>Hair Cutting</Text>
                      <Checkbox />
                  </Stack> */}
                    <Button isLoading={loading} type="submit" bgColor={'#d70f64'}
                        color={'white'}>
                        {id ? 'Edit Employee' : 'Add Employee'}
                    </Button>
              </VStack>
          </form>
        </VStack>
    );
};

export default AddEmployee;
