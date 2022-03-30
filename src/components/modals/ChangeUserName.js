import { Button, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalFooter, ModalHeader, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserName } from '../../utils/profile/ProfileUpdate'
import ErrorToaster from '../../utils/toaster/ErrorToaster'
import UpdateProfileModal from './UpdateProfileModal'

const ChangeUserName = () => {

    const dispatch = useDispatch()
    const toast = useToast()

    const { user, loading } = useSelector(state => state.Auth)

    const [fistName, setfistName] = useState(null)
    const [lastName, setlastName] = useState(null)

    useEffect(() => {
        if (user) {
            setfistName(user?.data?.user?.firstName)
            setlastName(user?.data?.user?.lastName)
        }
    }, [user])

    const submitHandler = () => {
        if ((fistName && lastName) && (fistName !== user?.data?.user?.firstName || lastName !== user?.data?.user?.lastName)) {
            const data = {
                user_id: user?.data?.user?._id,
                firstName: fistName,
                lastName: lastName
            }
            changeUserName(dispatch, data, toast)
        }
        else (
            ErrorToaster(toast, 'Previous and recent name is same or empty')
        )
    }

    return (
        <UpdateProfileModal>
            <ModalHeader>Update User Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

                <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input required value={fistName} onChange={(e) => setfistName(e.target.value)} placeholder='First name' />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Last name</FormLabel>
                    <Input required value={lastName} onChange={(e) => setlastName(e.target.value)} placeholder='Last name' />
                </FormControl>

            </ModalBody>

            <ModalFooter>
                <Button isLoading={loading} onClick={() => submitHandler()} colorScheme='blue' mr={3}>
                    Save
                </Button>
                {/* <Button onClick={''}>Cancel</Button> */}
            </ModalFooter>

        </UpdateProfileModal>
    )
}

export default ChangeUserName
