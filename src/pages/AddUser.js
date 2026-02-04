import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

const CREATE_USER = gql`
mutation PostData($email:String!,$password:String!,$organizationId:String){
    createUser(email:$email,password:$password,organizationId:$organizationId){
        email
        password
        organizationId
    }
  }`;
const AddUser = () => {
    const uniqueId = uuid();
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email Address is mendatory'),
        password: Yup.string()
            .required('password is mendatory')
            .matches(/[a-z]+/, 'One lowercase character')
            .matches(/[A-Z]+/, 'One uppercase character')
            .matches(/[@$!%*#?&]+/, 'One special character')
            .matches(/\d+/, 'One number')
            .min(8, 'Must be 8 characters or more')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const [passwordShow, setPasswordShow] = useState(false);
    const navigate = useNavigate();
    const [createUser, { loading }] = useMutation(CREATE_USER);
    const onSubmit = async (e) => {
        await createUser({
            variables: {
                email: e.email,
                password: e.password,
                organizationId: uniqueId
            }
        }).then((res) => {
            toast.success('Add User Successfully');
            navigate('/organization-information');
        }).catch((err) => {
            toast.error(err?.message);
        });
    };
    return (
        <>
            { !loading && <div className="h-[calc(100vh-4.4vh)] flex">
                <div className="w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center i hidden sm:flex ">
                    <div>
                        <h1 className="text-white font-bold text-4xl font-sans">Confluence</h1>
                        <p className="text-white mt-1">The simplest app to use</p>
                        <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2  ">Read More</button>
                    </div>
                </div>
                <div className="flex w-1/2 justify-center items-center bg-white w-full md:w-3/4  lg:w-1/2 flex flex-col items-center bg-slate-50 rounded-md pt-12 ">
                    <form className="bg-white" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Add user</h1>
                        <div className="mb-4">
                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input className="pl-2 outline-none border-none " type="text" name="email" id="" placeholder="Email Address"
                                    {...register('email')} />
                            </div>
                            {errors?.email && <div className="text-red-500 text-sm mt-1 mb-4 pl-4">{errors?.email?.message}</div>}
                        </div>
                        <div>
                            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <input className="pl-2 outline-none border-none" type={passwordShow ? 'text' : 'password'} name="password" id="" placeholder="Password"
                                    {...register('password')}/>
                                <label onClick={() => { setPasswordShow(!passwordShow); }}
                                    className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                                >{passwordShow ? 'hide' : 'show'}</label>
                            </div>
                            {errors && errors?.password && <p className="text-red-500 text-xs italic">{errors?.password?.message}</p>}
                        </div>
                        <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Add User</button>
                    </form>
                </div>
            </div>}
        </>
    );
};
export default AddUser;
