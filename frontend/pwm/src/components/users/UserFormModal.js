import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Modal from '../shared/Modal';
import { useCreateUserMutation, useEditUserMutation } from '../../hooks/userHooks';

const empSchema = yup.object({
  empName: yup.string().required(),
  email: yup.string().email().required(),
  location: yup.string().required(),
}).required();

const UserFormModal = ({ user, isOpen, handleClose }) => {
//   const { data } = useGetAllDepartmentsQuery();

  const { mutateAsync: createUser, error: createError } = useCreateUserMutation();
  const { mutateAsync: editUser, error: editError } = useEditUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(empSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    await createUser({
      name: data.empName,
      email: data.email,
      location: data.location,
      department: Number(data.department),
    });

    toast.success('User Created');
    reset();
    handleClose();
  };

  if (createError || editError) {
    toast.error('Something went wrong');
  }

  console.log('8888', user);

  return (
    <Modal
      title={`${user ? 'Edit' : 'Create New'} User`}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-6 w-full'>
          <div className='mb-3'>
            <label
              htmlFor='empName'
              className='block mb-2 text-sm font-medium text-gray-400 '
            >
              Name
            </label>
            <input
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-slate-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline'
              id='empName'
              type='text'
              {...register('empName')}
              defaultValue={user?.name || ''}
              placeholder='Name'
            />
            <p className='my-1 text-red-400 text-sm capitalize'>
              {errors.empName && 'Name Is A Required Field'}
            </p>
          </div>

          <div className='mb-3'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-400 '
            >
              Email address
            </label>
            <input
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-slate-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='text'
              {...register('email')}
              defaultValue={user?.email || ''}
              placeholder='Email'
            />
            <p className='my-1 text-red-400 text-sm capitalize'>
              {errors.email?.message}
            </p>
          </div>

          <div className='mb-3'>
            <label
              htmlFor='location'
              className='block mb-2 text-sm font-medium text-gray-400 '
            >
              Location
            </label>
            <input
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 bg-slate-700 text-gray-200 leading-tight focus:outline-none focus:shadow-outline'
              id='location'
              type='text'
              {...register('location')}
              defaultValue={user?.location || ''}
              placeholder='Location'
            />
            <p className='my-1 text-red-400 text-sm capitalize'>
              {errors.location?.message}
            </p>
          </div>
        </div>

        <div className='mb-3'>
          <label
            htmlFor='department'
            className='block mb-2 text-sm font-medium text-gray-400 '
          >
            Select a department
          </label>
          <select
            id='countries'
            className='bg-slate-700 border border-gray-400 text-gray-400 rounded shadow focus:outline-none focus:ring-gray-300 focus:border-gray-500 w-full py-1.5 px-3'
            {...register('department')}
          >
            {/* <option>Choose a department</option>
            {data?.map((department) => (
              <option value={department.id} key={department.id}>
                {department.name}
              </option>
            ))} */}
          </select>
          <p className='my-1 text-red-400 text-sm capitalize'>
            {errors.department && 'Department Is A Required Field'}
          </p>
        </div>

        <div className='bg-[#192734] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3'>
          <button
            type='submit'
            className='inline-flex w-full justify-center rounded-md bg-teal-400 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-teal-200 sm:ml-3 sm:w-auto'
          >
            {user ? 'Edit' : 'Create'}
          </button>
          <button
            type='button'
            className='mt-3 inline-flex w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
