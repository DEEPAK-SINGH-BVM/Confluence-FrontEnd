import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    // createOrganization,
     signup } from '../redux/organization/organizationThunk';

export default function SignUp () {
    const [passwordShow, setPasswordShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is mendatory'),
        employees: Yup.string()
            .required('Number Of Employ is mendatory'),
        category: Yup.string()
            .required('Select Category is mendatory'),
        email: Yup.string()
            .required('Email Address is mendatory'),
        password: Yup.string()
            .required('password is mendatory')
            .matches(/[a-z]+/, 'One lowercase character')
            .matches(/[A-Z]+/, 'One uppercase character')
            .matches(/[@$!%*#?&]+/, 'One special character')
            .matches(/\d+/, 'One number')
            .min(8, 'Must be 8 characters or more'),
        number: Yup.string()
            .required('number is mendatory')
            .min(10, 'Must be 10 characters or more')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, reset, handleSubmit, formState: { errors } } = useForm(formOptions);
    // const onSubmit = async (data) => {
    //     // await dispatch(createOrganization({ data, onCreateOrganization }));
    //     await dispatch(signup({ data, onCreateOrganization }));
    // };
    // const onCreateOrganization = () => {
    //     reset();
    //     navigate('/plan');
    // };
    const onSubmit = async (data) => {
        const resultAction = await dispatch(signup({ data }));
        if (signup.fulfilled.match(resultAction)) {
            reset();
            navigate('/plan');
        }
    }
    return (
        <>
            <div className="h-screen flex">
                <div className="hidden w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center sm:flex">
                    <div className="flex flex-col items-center">
                        <h1 className="text-white font-bold text-4xl font-sans">Confluence</h1>
                        <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>
                        <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2 ">Read More</button>
                    </div>
                </div>
                <div className="flex w-full justify-center items-center bg-white sm:w-1/2">
                    <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Sign Up</h1>
                        <p className="text-sm font-normal text-gray-600 mb-7">Please fill in this form to create an account!</p>
                        {/* {error && <p className="flex items-center  bg-blue-100 border-blue-500 text-red-600 text-sm font-bold px-4 py-3 rounded relative mb-4">{error.message}</p>} */}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="name" id="" placeholder="First Name" {...register('name', { required: true })}/>
                        </div>
                        {errors.name && <span className="text-red-600 flex pl-4">{errors.name?.message}</span>}

                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 w-full outline-none border-none" type="text" name="email" id="" placeholder="Email Address" {...register('email', { required: true })}/>
                        </div>
                        {errors.email && <span className="text-red-600 flex pl-4">{errors.email?.message}</span>}

                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 w-full outline-none border-none" type="number" name="number" id="" placeholder="Number" {...register('number', { required: true })}/>
                        </div>
                        {errors.number && <span className="text-red-600 flex pl-4">{errors.number?.message}</span>}

                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 w-full outline-none border-none" type="number" name="employees" id="" placeholder="Number of Employ" {...register('employees', { required: true })}/>
                        </div>
                        {errors.employees && <span className="text-red-600 flex pl-4">{errors.employees?.message}</span>}

                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <select className="pl-2 w-full outline-none border-none w-full" type="number" name="category" id="" placeholder="Select Category" {...register('category', { required: true })}>

                                <option value="" disabled selected>Choose here</option>
                                <option value="Playing">Playing</option>
                                <option value="Shoping">Shoping</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Technology">Technology</option>
                                <option value="Music">Music</option>
                                <option value="Public Event">Public Event</option>
                            </select>

                        </div>
                        {errors.category && <span className="text-red-600 flex pl-4">{errors.category?.message}</span>}
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input className="pl-2  outline-none border-none" type={passwordShow ? 'text' : 'password'} name="password" id="" placeholder="password" {...register('password', { required: true })}/>
                            <label onClick={() => { setPasswordShow(!passwordShow); }}
                                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                            >{passwordShow ? 'hide' : 'show'}</label>
                        </div>
                        {errors.password && <span className="text-red-600 flex pl-4">{errors.password?.message}</span>}
                        <label onClick={() => { navigate('/login'); }}
                            className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                        >Login Now ?</label>
                        <button type="submit" className="block w-full bg-indigo-600 mt-2 py-2 rounded-2xl text-white font-semibold mb-2" >SignUp</button>
                    </form>
                </div>
            </div>
        </>
    );
}
