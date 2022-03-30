import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddAppointments from '../../screens/addScreens/AddAppointment';
import AddCategory from '../../screens/addScreens/AddCategory';
import AddCoupon from '../../screens/addScreens/AddCoupon';
import AddEmployee from '../../screens/addScreens/AddEmployee';
import AddSaloon from '../../screens/addScreens/AddSaloon';
import AddService from '../../screens/addScreens/AddService';
import ForgetPass from '../../screens/auth/ForgetPass';
import OTP from '../../screens/auth/OTP';
import ResetPass from '../../screens/auth/ResetPass';
import Signin from '../../screens/auth/Signin';
import AdminSignin from '../../screens/auth/AdminSignin';
import Signup from '../../screens/auth/Signup';
import Appointments from '../../screens/Dashbaord/Appointments';
import Category from '../../screens/Dashbaord/Category';
import Coupens from '../../screens/Dashbaord/Coupens';
import Employee from '../../screens/Dashbaord/Employee';
import Home from '../../screens/Dashbaord/Home';
import AdminHome from '../../screens/Dashbaord/AdminHome'
import Profile from '../../screens/Dashbaord/Profile';
import Serivces from '../../screens/Dashbaord/Serivces';
import PrivateRoute from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import AdminRoute from './AdminRoute';
import SaloonList from '../../screens/Dashbaord/SaloonList';
import AddAdminSalon from '../../screens/addScreens/AddAdminSalon';

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/adminhome"
                    element={
                        <AdminRoute>
                            <AdminHome/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/saloonlist"
                    element={
                        <AdminRoute>
                            <SaloonList />
                        </AdminRoute>
                    }
                />
                <Route
                    path="/addadminsalon"
                    element={
                        <AdminRoute>
                            <AddAdminSalon/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/saloonlist/:id"
                    element={
                        <AdminRoute>
                            <AddAdminSalon isUpdate={true}/>
                        </AdminRoute>
                    }
                />
                <Route
                    path="/addsalon"
                    element={
                        <PrivateRoute>
                            <AddSaloon />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employee"
                    element={
                        <PrivateRoute>
                            <Employee />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/services"
                    element={
                        <PrivateRoute>
                            <Serivces />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/appointment"
                    element={
                        <PrivateRoute>
                            <Appointments />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/coupons"
                    element={
                        <PrivateRoute>
                            <Coupens />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/addcoupons"
                    element={
                        <PrivateRoute>
                            <AddCoupon />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/coupons/:id"
                    element={
                        <PrivateRoute>
                            <AddCoupon />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/addappointment"
                    element={
                        <PrivateRoute>
                            <AddAppointments />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/addservice"
                    element={
                        <PrivateRoute>
                            <AddService />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/category"
                    element={
                        <PrivateRoute>
                            <Category />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/addcategory"
                    element={
                        <PrivateRoute>
                            <AddCategory />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/category/:id"
                    element={
                        <PrivateRoute>
                            <AddCategory />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/service/:id"
                    element={
                        <PrivateRoute>
                            <AddService />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/addemployee"
                    element={
                        <PrivateRoute>
                            <AddEmployee />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/updatesalon"
                    element={
                        <PrivateRoute>
                            <AddSaloon isUpdate={true} />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/employee/:id"
                    element={
                        <PrivateRoute>
                            <AddEmployee />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/admin/login"
                    element={
                        <PublicRoute>
                            <AdminSignin />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <PublicRoute>
                            <Signin />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/forgetpassword"
                    element={
                        <PublicRoute>
                            <ForgetPass />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/resetpassword"
                    element={
                        <PublicRoute>
                            <ResetPass />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/otp"
                    element={
                        <PublicRoute>
                            <OTP />
                        </PublicRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoutes;
