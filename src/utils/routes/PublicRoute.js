
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


export const PublicRoute = ({ children }) => {

    const { user } = useSelector(state => state.Auth)

    return (
        
        user?.data?.user?.role == 'owner' && 
        <Navigate to={'/'}/>
        || user?.data?.user?.role == 'admin' &&
        <Navigate to={'/adminhome'}/>
        || !user &&
        [children]
    )
}
