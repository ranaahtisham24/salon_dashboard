
const SuccessToaster = (toast, message) => {
    toast({
        title: 'Success',
        description: message || 'Success',
        status: 'success',
        duration: 9000,
        isClosable: true,
    })
}

export default SuccessToaster
