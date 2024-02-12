import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from '../index';

export const useGetAllUsersQuery = () =>
  useQuery({
    queryKey: ['all-clients'],
    queryFn: async () => (await axios.get('/api/users')).data,
  });

export const useCreateUserMutation = () =>
  useMutation({
    mutationFn: async (empData) => (await axios.post('/api/users/', empData)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-users']),
  });

export const useEditUserMutation = () =>
  useMutation({
    mutationFn: async ({ id, name }) =>
      (await axios.put(`/api/users/${id}`, { name })).data,
    onSuccess: () => queryClient.invalidateQueries(['all-users']),
  });

export const useDeleteUserMutation = () =>
  useMutation({
    mutationFn: async ({ id }) =>
      (await axios.delete(`/api/users/${id}`)).data,
    onSuccess: () => queryClient.invalidateQueries(['all-users']),
  });
