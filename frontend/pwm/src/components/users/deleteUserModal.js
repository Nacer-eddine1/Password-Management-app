import { toast } from 'react-toastify';

import Modal from '../shared/Modal';
import { User } from '../../types/user';
import { useDeleteUserMutation } from '../../hooks/userHooks';

const DeleteUserModal = ({ user, isOpen, handleClose }) => {
  const { mutateAsync: deleteUser, error } = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    await deleteUser({ id: user.id });

    toast.success('User Deleted');
    handleClose();
  };

  if (error) {
    toast.error('Something went wrong');
  }

  return (
    <Modal
      title='Confirm Delete User'
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className='mt-6 w-full'>
        <p>
          Are you sure you want to delete user <u>{user?.name}</u> ?
        </p>
      </div>

      <div className='bg-[#192734] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-3'>
        <button
          type='button'
          className='inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-red-300 sm:ml-3 sm:w-auto'
          onClick={handleDeleteUser}
        >
          Yes, delete it
        </button>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
