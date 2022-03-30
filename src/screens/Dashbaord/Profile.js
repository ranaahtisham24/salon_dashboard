import React from 'react';
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    Box,
    FormControl,
    Avatar,
    useToast,
    InputRightElement,
    CircularProgress,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfilePic } from '../../utils/profile/ProfileUpdate';
import ChangeUserName from '../../components/modals/ChangeUserName';
import ChangeEmail from '../../components/modals/ChangeEmail';

const Profile = () => {
    const dispatch = useDispatch();
    const toast = useToast();

    const { user, loading } = useSelector(state => state.Auth);
    console.log('1111111',user)

    const imageHandler = file => {
        const fd = new FormData();
        fd.append('profileImage', file, file?.name);
        fd.append('user_id', user.data.user._id);
        console.log('🚀 ~ file: Profile.js ~ line 45 ~ imageHandler ~ fd', fd);
        changeProfilePic(dispatch, fd, toast);
    };

    return (
        <Flex
            flexDirection="column"
            width="auto"
            height="auto"
            bg="white"
            justifyContent="start"
            alignItems="center"
            boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
            borderRadius={'lg'}
            p={'4'}
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                {/* <Avatar bg="blue.600" cursor={'pointer'} onClick={() => nav('/signin')} /> */}
                <Heading pb="4" color="blue.600" paddingBottom={'12'}>
                    Update Your Profile
                </Heading>
                <Box minW={{ base: '90%', md: '468px' }}>
                    <Stack
                        spacing={4}
                        p="1rem"
                        backgroundColor="transparent"
                        boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
                        borderRadius={'lg'}
                        color={'white'}
                        alignItems={'center'}
                        position={'relative'}
                        pt={'12'}
                    >
                        {loading ? (
                            <CircularProgress isIndeterminate color="orange" />
                        ) : (
                            <Box zIndex={'banner'} position={'absolute'} top={'-14'}>
                                    <Avatar
                                        size={'xl'}
                                        src={
                                            process.env.REACT_APP_BASE_URL +
                                            user?.data?.user?.profileImage
                                        }
                                        bgColor={'blue.700'}
                                    />
                                    <Box
                                        position={'absolute'}
                                        bottom={'0'}
                                        right={'0'}
                                        color={'teal'}
                                    >
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
                                        onChange={e => imageHandler(e.target.files[0])}
                                    />
                                </Box>
                        )}
                        <FormControl>
                            <InputGroup>
                                <Input
                                    value={user?.data?.user?.firstName}
                                    isReadOnly={true}
                                    required
                                    fontWeight={'bold'}
                                    type="text"
                                    placeholder="First Name"
                                    color={'black'}
                                />
                                <InputRightElement mr={'2'} width="4.5rem">
                                    {/* <Button bgColor={'#d70f64'}
color={'white'} h="1.75rem" size="sm" onClick={''}>
                                        {user?.data?.user?.firstName ? "Change" : "Update"}
                                    </Button> */}
                                    <ChangeUserName />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <Input
                                    value={user?.data?.user?.lastName}
                                    isReadOnly={true}
                                    required
                                    fontWeight={'bold'}
                                    type="Text"
                                    placeholder="Last Name"
                                    color={'black'}
                                />
                                <InputRightElement mr={'2'} width="4.5rem">
                                    {/* <Button bgColor={'#d70f64'}
color={'white'} h="1.75rem" size="sm" onClick={''}>
                                        {user?.data?.user?.lastName ? "Change" : "Update"}
                                    </Button> */}
                                    <ChangeUserName />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <Input
                                    value={user?.data?.user?.email}
                                    isReadOnly={true}
                                    required
                                    type="email"
                                    placeholder="Email address"
                                    fontWeight={'bold'}
                                    color={'black'}
                                />
                                <InputRightElement mr={'2'} width="4.5rem">
                                    {/* <Button bgColor={'#d70f64'}
color={'white'} h="1.75rem" size="sm" onClick={''}>
                                        {user?.data?.user?.email ? "Change" : "Update"}
                                    </Button> */}
                                    <ChangeEmail />
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <InputGroup>
                                <Input
                                    value={user?.data?.user?.phoneNumber}
                                    isReadOnly={true}
                                    required
                                    fontWeight={'bold'}
                                    type="tel"
                                    placeholder="Search here"
                                    color={'black'}
                                />
                                <InputRightElement mr={'2'} width="4.5rem">
                                    <Button
                                        bgColor={'#d70f64'}
                                        color={'white'}
                                        h="1.75rem"
                                        size="sm"
                                        onClick={''}
                                    >
                                        {user?.data?.user?.phoneNumber ? 'Change' : 'Update'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button w="full" bgColor={'#d70f64'} color={'white'}>
                            Change Password
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Profile;
