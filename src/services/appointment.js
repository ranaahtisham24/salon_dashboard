import axios from "axios";


export const getAppointmentServices = async (data) => await axios.post('/api/get_salon_bookings', data)

export const addAppointmentServices = async (data) => await axios.post('/api/add_booking_dashboard', data)

export const getAppointmentByIdServices = async (data) => await axios.post('/api/get_employee_by_id', data)

export const editAppointmentServices = async (data) => await axios.post('/api/change_booking_status', data)

export const updateAppointmentPicServices = async (data) => await axios.post('/api/update_profile_image', data)

export const deleteAppointmentServices = async (data) => await axios.post('/api/delete_employee', data)