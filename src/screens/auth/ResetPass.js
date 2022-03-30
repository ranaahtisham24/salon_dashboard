import { useRef, useState } from "react";
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
    InputRightElement,
    useToast
} from "@chakra-ui/react";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import ErrorToaster from "../../utils/toaster/ErrorToaster";
import { resetPassword } from "../../actions/auth/auth";

const ResetPass = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const { email, loading } = useSelector(state => state.Auth)


    const nav = useNavigate()

    const dispatch = useDispatch()

    const toast = useToast()

    const PasswordRef = useRef()
    const ConfirmPassRef = useRef()
    const otpRef = useRef()

    const submitHandler = (e) => {

        e.preventDefault()

        if (PasswordRef.current.value === ConfirmPassRef.current.value) {
            console.log('entered in data');
            const data = {
                isMobile: false,
                email: email,
                newPassword: PasswordRef.current.value,
                resetPasswordOtp: otpRef.current.value,
            }
            dispatch(resetPassword(data, toast, nav))

        } else {
            console.log('error');
            ErrorToaster(toast, 'password and confirm password does not match')
        }

    }
    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            bg='white'
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
                <Avatar bg="blue.600" cursor={'pointer'} onClick={() => nav('/signin')} />
                <Heading color="blue.600">Welcome to Salon on Phone</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
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
                                    ref={otpRef}
                                    color={'black'}
                                    type={'text'}
                                    placeholder="Enter OTP sent on your email"
                                />

                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        required
                                        ref={PasswordRef}
                                        color={'black'}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button bgColor={'#d70f64'} h="1.75rem" size="sm" onClick={handleShowClick}>
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <InputGroup>
                                    <Input
                                        required
                                        ref={ConfirmPassRef}
                                        color={'black'}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                    />
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
                            >
                                Reset Password
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
            <Box>
                Already have an account?{" "}
                <Link onClick={() => nav('/signin')} color="pink.700" href="#">
                    Sign in
                </Link>
            </Box>
        </Flex>
    )
}

export default ResetPass
