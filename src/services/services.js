import axios from "axios";


export const addServiceServices = async (data) => await axios.post('/api/add_service', data)

export const getSalonServices = async (data) => await axios.post('/api/get_salon_service', data)

export const getSalonServiceByIdServices = async (data) => await axios.post('/api/get_service_by_id', data)

export const editSalonServiceServices = async (data) => await axios.post('/api/update_service', data)

export const updateServicePicServices = async (data) => await axios.post('/api/update_service_image', data)

export const deleteSalonServiceServices = async (data) => await axios.post('/api/delete_service', data)