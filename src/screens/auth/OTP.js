import { useRef } from "react";
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
    useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { activateAccount, resendOTP } from "../../actions/auth/auth";
import { useNavigate } from "react-router-dom";

const OTP = () => {

    const { loading, email } = useSelector(state => state.Auth)

    const toast = useToast()

    const dispatch = useDispatch()

    const nav = useNavigate()

    const otpRef = useRef()

    const submitHandler = (e) => {

        e.preventDefault()

        const data = {
            email_id: email,
            isMobile: false,
            otpCode: otpRef.current?.value
        }
        dispatch(activateAccount(data, toast))


    }

    const resendHandler = () => {
        const data = {
            email_id: email,
            isMobile: false,
        }
        dispatch(resendOTP(data, toast))
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

                                <Input ref={otpRef} color={'black'} type="text" placeholder="Enter OTP send to you" />

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
                Didn't received OTP?{" "}
                <Link onClick={() => resendHandler()} color="pink.700" href="#">
                    Resent OTP
                </Link>
            </Box>
        </Flex>
    )
}

export default OTP
