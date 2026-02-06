import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createOrderPayUrl } from '../../redux/cashFree/cashFreeThunk';

export default function UpiIdModel ({ opens, setOpens }) {
    const [open, setOpen] = useState(opens);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        setOpen(opens);
    }, [opens]);

    const handleClose = () => {
        setOpens(!open);
    };

    const onSubmit = (e) => {
        const session = JSON.parse(localStorage.getItem('session'));
        const data = {
            upi_id: e.upi_id,
            session_id: session?.session_id
        };
        dispatch(createOrderPayUrl({ data, onOrderPayUrlCreated }));
        setOpens(!open);
    };

    const onOrderPayUrlCreated = (data) => {
        window.open(data);
    };

    return (
        open && <div
            className='main-modal fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center animated faster'
            style={{ background: 'rgba(0,0,0,.7)' }}>
            <div
                className='border border-blue-500 shadow-lg modal-container bg-white w-4/12 md:max-w-11/12 mx-auto rounded-xl shadow-lg z-50 overflow-y-auto'>
                <div className='modal-content py-4 text-left px-6'>
                    <div className='flex justify-between items-center pb-3'>
                        <p className='text-2xl font-bold text-gray-500'>Add UPI ID</p>
                        <div className='modal-close cursor-pointer z-50' onClick={handleClose}>
                            <svg className='fill-current text-gray-500' xmlns='http://www.w3.org/2000/svg' width='18'
                                height='18'
                                viewBox='0 0 18 18'>
                                <path
                                    d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'>
                                </path>
                            </svg>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                        <div className='flex justify-center '>
                            <div className='w-full'>
                                <div className=''>
                                    <input type='text' autoComplete='off'
                                        {...register('upi_id', {
                                            required: 'upi is not required'
                                        })}
                                        className='h-3 p-6 w-full border-2 border-gray-300 mb-1 rounded-md'
                                        placeholder='Example. JohnDoe@oksbi'/>
                                    {errors.upi_id && <div className='text-red-500'>{errors.upi_id.message}</div>}
                                </div>
                            </div>

                        </div>
                        <div className='flex justify-end pt-2 space-x-14'>
                            <button
                                className='px-4 bg-gray-200 p-3 rounded text-black hover:bg-gray-300 font-semibold' type='button'
                                onClick={handleClose}>Cancel
                            </button>
                            <button
                                className='px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-black'
                                type='submit'>Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
UpiIdModel.propTypes = {
  opens: PropTypes.bool,
  setOpens: PropTypes.func,
};
