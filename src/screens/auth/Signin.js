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
import { loginUser } from '../../actions/auth/auth';

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword(() => !showPassword);
  };

  const { loading } = useSelector(state => state.Auth);
  console.log('🚀 ~ file: Signin.js ~ line 28 ~ Signin ~ loading', loading);

  const nav = useNavigate();

  const toast = useToast();

  const dispatch = useDispatch();

  const EmailRef = useRef();
  const PasswordRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    console.log('entered in data');
    const data = {
      email_id: EmailRef?.current?.value,
      isMobile: false,
      password: PasswordRef?.current?.value,
    };
    dispatch(loginUser(data, toast, nav));
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
        p={'4'}
        borderRadius={'lg'}
      >
        <Avatar
          bg="blue.600"
          cursor={'pointer'}
          onClick={() => nav('/signin')}
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
          <Link onClick={() => nav('/admin/login')} color="pink.700" href="#">
            Login As Admin
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signin;
