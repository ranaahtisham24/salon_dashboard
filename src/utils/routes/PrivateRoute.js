import { HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'


const PrivateRoute = ({ children }) => {

    const { user } = useSelector(state => state.Auth)
    console.log('3333333', user?.data?.user?.role)

    return (
        <>
        {
        user?.data?.user?.role == 'owner' ?
            <HStack alignItems={'flex-start'} spacing={'0'} bg='white' w='full' minH={'100vh'} >
                <Sidebar />
                <VStack w='87%' minH='100vh' spacing={'8'} pb={'2'}>
                    <Header />
                    {[children]}
                </VStack>
            </HStack>
            :
            <Navigate to={'/signin'} />
        }
            </>
    )
}

export default PrivateRoute
