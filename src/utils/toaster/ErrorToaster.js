

const ErrorToaster = (toast, message) => 

    toast({
        title: 'Error',
        description: message || 'an error occured',
        status: 'error',
        duration: 9000,
        isClosable: true,
    }

)



export default ErrorToaster
