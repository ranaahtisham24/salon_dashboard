import { Button, Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../../actions/auth/auth'

const UpdateProfileModal = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch()

    const { isModalOpen } = useSelector(state => state.Auth)
    console.log("🚀 ~ file: UpdateProfileModal.js ~ line 13 ~ UpdateProfileModal ~ isModalOpen", isModalOpen)

    useEffect(() => {

        if (isModalOpen) {
            onClose()
            dispatch(closeModal())
        }
    }, [isModalOpen])


    return (
        <>
            <Button bgColor={'#d70f64'}
                color={'white'} h="1.75rem" size="sm" onClick={onOpen}>
                {"Update"}
            </Button>

            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    {children}
                </ModalContent>
            </Modal>
        </>
    )

}

export default UpdateProfileModal
