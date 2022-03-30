import axios from "axios";


export const getUserSalonServices = async (data) => await axios.post('api/get_user_salon', data)

export const addSalonServices = async (data) => await axios.post('/api/add_salon', data)

export const updateSalonServices = async (data) => await axios.post('/api/update_salon', data)

export const updateSalonLogoServices = async (data) => await axios.post('/api/update_salon', data)

export const getSalonListService = async (data) => await axios.post('/api/admin_get_all_salons', data)