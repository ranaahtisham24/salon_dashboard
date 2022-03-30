import React, { useRef, useState } from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    Box,
    Link,
    FormControl,
    InputRightElement,
    Select,
    useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import ErrorToaster from '../../utils/toaster/ErrorToaster';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/auth/auth';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const { loading } = useSelector(state => state.Auth);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const firstNameRef = useRef();
    const SecondNameRef = useRef();
    const EmailRef = useRef();
    const PasswordRef = useRef();
    const ConfirmPassRef = useRef();
    const PhoneNumberRef = useRef();
    const GenderRef = useRef();

    const submitHandler = e => {
        e.preventDefault();

        if (PasswordRef.current.value === ConfirmPassRef.current.value) {
            console.log('entered in data');
            const data = {
                firstName: firstNameRef.current.value,
                lastName: SecondNameRef.current.value,
                gender: GenderRef.current.value,
                phoneNumber: PhoneNumberRef.current.value,
                role: 'owner',
                email: EmailRef.current.value,
              password: PasswordRef.current.value,
          };
          dispatch(registerUser(data, toast, nav));
      } else {
          console.log('error');
          ErrorToaster(toast, 'password and confirm password does not match');
      }
    };

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            bg="white"
            justifyContent="center"
            alignItems="center"
            backgroundColor="white"
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                {/* <Avatar bg="blue.600" cursor={'pointer'} onClick={() => nav('/signin')} /> */}
                <Heading color="blue.600">Welcome to Salon on Phone</Heading>
                <Box minW={{ base: '90%', md: '468px' }}>
                    <form onSubmit={submitHandler}>
                        <Stack
                            spacing={4}
                            p="1rem"
                            backgroundColor="transparent"
                            boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
                            borderRadius={'lg'}
                            color={'white'}
                        >
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        required
                                        ref={firstNameRef}
                                        color={'black'}
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        required
                                        ref={SecondNameRef}
                                        color={'black'}
                                        type="Text"
                                        placeholder="Last Name"
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        required
                                        ref={EmailRef}
                                        color={'black'}
                                        type="email"
                                        placeholder="email address"
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        required
                                        ref={PasswordRef}
                                        color={'black'}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            bgColor={'#d70f64'}
                                            h="1.75rem"
                                            size="sm"
                                            onClick={handleShowClick}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        ref={ConfirmPassRef}
                                        required
                                        color={'black'}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        required
                                        ref={PhoneNumberRef}
                                        color={'black'}
                                        type="tel"
                                        placeholder="Phone Number"
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Select
                                        required
                                        ref={GenderRef}
                                        color={'black'}
                                        placeholder="Gender"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Select>
                                </InputGroup>
                            </FormControl>
                            <Button
                                borderRadius={'lg'}
                                type="submit"
                                variant="solid"
                                bgColor={'#d70f64'}
                                color={'white'}
                                width="full"
                                isLoading={loading}
                                onClick={()=> ''}
                            >
                                Add Location
                            </Button>
                            <Button
                                borderRadius={'lg'}
                                type="submit"
                                variant="solid"
                                bgColor={'#d70f64'}
                                color={'white'}
                                width="full"
                                isLoading={loading}
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already registered?{' '}
                <Link onClick={() => nav('/signin')} color="pink.700" href="#">
                    Sign in
                </Link>
            </Box>
        </Flex>
    );
};

export default Signup;
