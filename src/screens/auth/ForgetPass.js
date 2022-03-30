import { useRef } from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    Stack,
    Box,
    Link,
    Avatar,
    FormControl,
    useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import { forgetPassword } from '../../actions/auth/auth';
import { useDispatch, useSelector } from 'react-redux';

const ForgetPass = () => {
    const emailRef = useRef(null);

    const { loading } = useSelector(state => state.Auth);

    const nav = useNavigate();

    const toast = useToast();

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        const data = {
            email: emailRef.current.value,
            isMobile: false,
        };
        dispatch(forgetPassword(data, toast, nav));
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
                            backgroundColor="transparent"
                            boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
                            borderRadius={'lg'}
                            color={'white'}
                        >
                            <FormControl>
                                <Input
                                    required
                                    ref={emailRef}
                                    color={'black'}
                                    type="email"
                                    placeholder="email address"
                                />
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
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                New to us?{' '}
                <Link onClick={() => nav('/signup')} color="pink.700" href="#">
                    Sign up
                </Link>
            </Box>
        </Flex>
    );
};

export default ForgetPass;
