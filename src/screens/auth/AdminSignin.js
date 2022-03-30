import React, { useRef } from 'react';
import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../actions/auth/auth';

const AdminSignin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword(() => !showPassword);
  };

  const { loading } = useSelector(state => state.Auth);
  // console.log("🚀 ~ file: Signin.js ~ line 28 ~ Signin ~ loading", loading)

  const nav = useNavigate();

  const toast = useToast();

  const dispatch = useDispatch();

  const EmailRef = useRef();
  const PasswordRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    console.log('entered in data');
    const data = {
        email_id: EmailRef.current?.value,
        isMobile: false,
        password: PasswordRef.current?.value,
        role: 'admin'
    }
    dispatch(adminLogin(data, toast, nav))
  };

  // const loginHandler = () => {
  //   const data = {
  //     email_id: EmailRef.current?.value,
  //     isMobile: false,
  //     password: PasswordRef.current?.value,
  //     role: 'admin',
  //   };
  //   dispatch(adminLogin(data, toast, nav));
  // };

  return (
    <>
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
        p={'4'}
        borderRadius={'lg'}
      >
        <Avatar
          bg="blue.600"
          cursor={'pointer'}
          onClick={() => nav('/admin/login')}
        />
        <Heading color="blue.600">Welcome to Salon on Phone</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={submitHandler}>
            <Stack
              spacing={4}
              p="1rem"
              boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
              borderRadius={'lg'}
              color={'white'}
              // border={'0.5px solid lightgrey'}
            >
              <Heading textAlign={'center'} color={'#D70F64'}>
                Admin
              </Heading>
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
                    isRequired
                    ref={PasswordRef}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    color={'black'}
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
                <FormHelperText textAlign="right">
                  <Link
                    color={'pink.600'}
                    onClick={() => nav('/forgetpassword')}
                  >
                    forgot password?
                  </Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={'lg'}
                type="submit"
                variant="solid"
                bgColor={'#d70f64'}
                color={'white'}
                width="full"
                isLoading={loading}
                // onClick={() => loginHandler()}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          New to us?{' '}
          <Link onClick={() => nav('/signup')} color="pink.700" href="#">
            Sign up
          </Link>
        </Box>
        <Box>
          <Link onClick={() => nav('/signin')} color="pink.700" href="#">
            Login As User
          </Link>
        </Box>
      </Stack>
    </Flex>
    </>
  );
};

export default AdminSignin;
