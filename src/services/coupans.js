import axios from "axios";


export const getCoupansServices = async (data) => await axios.post('/api/get_all_salon_coupon', data)

export const addCoupansServices = async (data) => await axios.post('/api/add_coupon', data)

export const getCoupansByIdServices = async (data) => await axios.post('/api/get_coupon_by_id', data)

export const editCoupansServices = async (data) => await axios.post('/api/update_coupon', data)

export const getSalonbyIdServices = async (data) => await axios.post('/api/get_salons_by_id', data)

// export const updateCoupansPicServices = async (data) => await axios.post('/api/update_profile_image', data)

// export const deleteCoupansServices = async (data) => await axios.post('/api/delete_employee', data)