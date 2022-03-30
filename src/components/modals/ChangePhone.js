import { Button, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeEmailAddress } from '../../utils/profile/ProfileUpdate'
import ErrorToaster from '../../utils/toaster/ErrorToaster'
import UpdateProfileModal from './UpdateProfileModal'
import { activationEmailService } from '../../services/auth'
import SuccessToaster from '../../utils/toaster/SuccessToaster'


const ChangePhone = () => {

    const dispatch = useDispatch()
    const toast = useToast()

    const { user, loading } = useSelector(state => state.Auth)

    const [emailLoading, setemailLoading] = useState(false)

    const [email, setemail] = useState()

    const [isEmailSent, setisEmailSent] = useState(false)

    const newEmailRef = useRef()
    const passwordRef = useRef()
    const otpRef = useRef()

    useEffect(() => {
        if (user) {
            setemail(user?.data?.user?.email)
        }
    }, [user])

    const submitHandler = async () => {

        if ('isEmailSent') {
            if (newEmailRef.current.value && passwordRef.current.value && passwordRef.current.value) {
                const data = {
                    user_id: user?.data?.user?._id,
                    email: newEmailRef.current.value,
                    password: passwordRef.current.value,
                    otpCode: passwordRef.current.value
                }
                console.log("🚀 ~ file: ChangeEmail.js ~ line 42 ~ submitHandler ~ data", data)
                changeEmailAddress(dispatch, data, toast)
                setisEmailSent(false)
            } else {
                ErrorToaster(toast, 'one of the field is missing')
            }


        } else {
            if ((email) && (email !== user?.data?.user?.email)) {
                setemailLoading(true)
                const data = {
                    user_id: user?.data?.user?._id,
                    email: email
                }
                try {
                    await activationEmailService(data);
                    SuccessToaster(toast, 'OTP sent on your email')
                    setisEmailSent(true)
                    setemailLoading(false)
                } catch (error) {
                    setemailLoading(false)
                    ErrorToaster(toast, error?.response?.data?.message || error?.message)
                }
            }
            else {
                ErrorToaster(toast, 'Previous and recent email is same or empty')
            }

        }


    }

    return (
        <UpdateProfileModal>
            <ModalHeader>Update Email Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                {
                    isEmailSent ?
                        <>
                            <FormControl>
                                <FormLabel>New Email</FormLabel>
                                <Input ref={newEmailRef} placeholder='New Email' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input ref={passwordRef} placeholder='Password' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>OTP</FormLabel>
                                <Input ref={otpRef} placeholder='OTP' />
                            </FormControl>
                        </>
                        :
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input required value={email} onChange={(e) => setemail(e.target.value)} placeholder='Email' />
                        </FormControl>
                }
            </ModalBody>

            <ModalFooter>
                <Button isLoading={loading || emailLoading} onClick={() => submitHandler()} colorScheme='blue' mr={3}>
                    Update
                </Button>

            </ModalFooter>

        </UpdateProfileModal>
    )
}

export default ChangePhone
