import axios from "axios";


export const addCategoryServices = async (data) => await axios.post('/api/add_category', data)

export const getCategoryServices = async (data) => await axios.post('/api/get_salon_categories', data)

export const getCategoryByIdServices = async (data) => await axios.post('/api/get_category_by_id', data)

export const editCategoryServices = async (data) => await axios.post('/api/getSalonCategories', data)

export const deleteCategoryServices = async (data) => await axios.post('/api/delete_category', data)