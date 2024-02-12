import { useState } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useGetAllUsersQuery } from '../../hooks/userHooks';
import Loading from '../shared/loding'; // Assuming the Loading component is properly defined
import UserFormModal from './UserFormModal';
import DeleteUserModal from './deleteUserModal';

const Users = () => {
  const { data, isLoading, error } = useGetAllUsersQuery();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <div className='mt-8'>
      <table className='w-full table-auto border-collapse border border-slate-700'>
        <thead>
          <tr>
            <th className='border border-slate-600 p-3 bg-slate-700'>Email</th>
            <th className='border border-slate-600 p-3 bg-slate-700'>First Name</th>
            <th className='border border-slate-600 p-3 bg-slate-700'>Last Name</th>
            <th className='border border-slate-600 p-3 bg-slate-700'>Role</th>
            <th className='border border-slate-600 p-3 bg-slate-700'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user.id}>
                <td className='border border-slate-700 p-3'>{user.email}</td>
                <td className='border border-slate-700 p-3'>{user.first_name}</td>
                <td className='border border-slate-700 p-3'>{user.last_name}</td>
                <td className='border border-slate-700 p-3'>{user.role}</td>
                <td className='border border-slate-700 p-3'>
                  <div className='flex justify-center gap-2'>
                    <div
                      onClick={() => {
                        setSelectedUser(user);
                        setIsFormOpen(true);
                      }}
                      className='bg-teal-300 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer'
                    >
                      <AiOutlineEdit className='text-gray-700 font-bold text-center text-xl' />
                    </div>
                    <div
                      onClick={() => {
                        setSelectedUser(user);
                        setIsDeleteOpen(true);
                      }}
                      className='bg-red-400 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer'
                    >
                      <MdDelete className='text-gray-700 font-bold text-center text-xl' />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <UserFormModal
        user={selectedUser}
        isOpen={isFormOpen}
        handleClose={handleFormClose}
      />
      <DeleteUserModal
        user={selectedUser}
        isOpen={isDeleteOpen}
        handleClose={handleDeleteClose}
      />
    </div>
  );
};

export default Users;
