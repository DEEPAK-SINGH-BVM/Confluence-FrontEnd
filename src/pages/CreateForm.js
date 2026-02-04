import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/organization/organizationSlice';
const NEW_USER = gql`
  mutation PostMutation(
    $name:String!,
    $role:String!,
    $number:String!,
    $position:String!,
    $status:String!,
    $gender:String!,
  ) {
    createUser(name:$name, role:$role ,position:$position ,status:$status ,gender:$gender,number:$number) {
        name
        role
        position
        status
        gender
        number
    }
  }
`;
export default function Form () {
    const dispatch = useDispatch();
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .required('name is mendatory'),
        number: Yup.string()
            .required('number is mendatory'),
        status: Yup.string()
            .required('status is mendatory'),
        role: Yup.string()
            .required('role is mendatory'),
        position: Yup.string()
            .required('position is mendatory'),
        gender: Yup.string()
            .required('gender is mendatory')
    });
    const formOptions = { resolver: yupResolver(formSchema) };
    const { register, handleSubmit, formState: { errors }, reset } = useForm(formOptions);
    const [newUser] = useMutation(NEW_USER);

    const onSubmit = async (e) => {
        await dispatch(addUser(e));
        await newUser({
            variables: {
                name: e.name,
                role: e.role,
                position: e.position,
                number: e.number,
                status: e.status,
                gender: e.gender
            }
        }).then((res) => {
            toast.success('Create Form Successfully');
        }).catch((err) => {
            toast.error(err?.message);
        });
        reset();
    };
    return (
        <> <section className=" py-1 bg-blueGray-50 flex items-center h-[calc(100vh-5vh)]">
            <div className="w-full lg:w-4/12 px-4 mx-auto mt-40 sm:mt-0">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-2">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">
                                            User account
                            </h6>
                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                            User Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                        Username
                                        </label>
                                        <input type="text" className={`border-2  ${errors?.name ? 'border-red-600' : 'border-indigo-600'} px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} {...register('name', { required: true })}/>
                                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                        Number
                                        </label>
                                        <input type="number" className={`border-2 ${errors?.number ? 'border-red-600' : 'border-indigo-600'} border-indigo-600 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} {...register('number', { required: true })}/>
                                        {errors.number && <p className="text-red-500 text-xs italic">{errors.number.message}</p>}
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                        Status
                                        </label>
                                        <input type="text" className={`border-2 ${errors?.status ? 'border-red-600' : 'border-indigo-600'} px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} {...register('status', { required: true })}/>
                                        {errors.status && <p className="text-red-500 text-xs italic">{errors.status.message}</p>}
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                        Role
                                        </label>
                                        <input type="text" className={`border-2 ${errors?.role ? 'border-red-600' : 'border-indigo-600'} px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} {...register('role', { required: true })}/>
                                        {errors.role && <p className="text-red-500 text-xs italic">{errors.role.message}</p>}
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Position
                                        </label>
                                        <input type="text" className={`border-2 ${errors?.position ? 'border-red-600' : 'border-indigo-600'} px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} {...register('position', { required: true })}/>
                                        {errors.position && <p className="text-red-500 text-xs italic">{errors.position.message}</p>}
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                                Gender
                                        </label>
                                        <input type="text" className={`border-2 ${errors?.gender ? 'border-red-600' : 'border-indigo-600'} px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`} {...register('gender', { required: true })}/>
                                        {errors.gender && <p className="text-red-500 text-xs italic">{errors.gender.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <button type="submit" className="block w-80 bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};
