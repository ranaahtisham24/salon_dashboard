import React, { useEffect, useRef } from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    Select,
    Stack,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCategory, editCategory, getCategorybyId } from '../../actions/category/category';
const AddCategory = () => {
    const { user } = useSelector(state => state.Auth);

    const { userSalon } = useSelector(state => state.Dashboard);

    const { categoryById, loading } = useSelector(state => state.Category);

    const toast = useToast();

    const nav = useNavigate();

    const dispatch = useDispatch();

    const name = useRef();


    const { id } = useParams();

    useEffect(() => {
        const payload = {
            category_id: id,
            user_id: user?.data?.user?._id,
        };

        if (id) {
            dispatch(getCategorybyId(payload, toast, nav));
        }
    }, [id]);

    useEffect(() => {
        if (categoryById) {
            name.current.value = categoryById.name
        }
    }, [categoryById]);

    const addCategoryPayload = payload => {
        dispatch(addCategory(payload, toast, nav));
    };

    const editCategoryPayload = payload => {
        dispatch(editCategory(payload, toast, nav));
    };

    const submitHandler = e => {
        e.preventDefault();

        const payload = {
            user_id: user?.data?.user?._id,
            salon_id: userSalon?.data?._id,
            name: name.current?.value
        };

        if (id) {
            payload.coupon_id = id
            editCategoryPayload(payload);
        } else {
            addCategoryPayload(payload);
        }
    };
    return (
        <VStack
            p="8"
            w="90%"
            h="auto"
            bgColor={'white'}
            borderRadius={'lg'}
            spacing={'4'}
            boxShadow={'0 3px 10px rgb(0 0 0 / 20%)'}
        >
            <Text fontWeight={'bold'} fontSize={'2xl'}>
                Add Category
            </Text>
            <form onSubmit={submitHandler} style={{ width: '100%', height: 'auto' }}>
                <VStack spacing={'4'}>
                    <Stack w="full" direction={{ base: 'column', lg: 'row' }} spacing={'8'}>
                        <FormControl isRequired>
                            <FormLabel>Category Name</FormLabel>
                            <Input ref={name} />
                        </FormControl>
                    </Stack>
                    <Button isLoading={loading} type="submit" bgColor={'#d70f64'}
                        color={'white'}>
                        {id ? 'Edit Category' : 'Add Category'}
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
};

export default AddCategory;
