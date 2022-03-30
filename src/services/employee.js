import axios from "axios";


export const getEmployeeServices = async (data) => await axios.post('/api/get_all_salons_employees', data)

export const addEmployeeServices = async (data) => await axios.post('/api/add_employee', data)

export const getEmployeeByIdServices = async (data) => await axios.post('/api/get_employee_by_id', data)

export const editEmployeeServices = async (data) => await axios.post('/api/update_employee', data)

export const updateEmployeePicServices = async (data) => await axios.post('/api/update_profile_image', data)

export const deleteEmployeeServices = async (data) => await axios.post('/api/delete_employee', data)