import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './axios';
import { useAuthStore } from '../store/useAuthStore';

export const useSignup = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (data) => api.post('/auth/signup', data).then((r) => r.data),
    onSuccess: (data) => setAuth(data.user, data.accessToken),
  });
};

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: (data) => api.post('/auth/login', data).then((r) => r.data),
    onSuccess: (data) => setAuth(data.user, data.accessToken),
  });
};

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post('/auth/logout').then((r) => r.data),
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
    onError: () => {
      // Force logout even if server request fails
      logout();
      queryClient.clear();
    },
  });
};

export const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('/users/me').then((r) => r.data),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

export const useUpdateMe = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.patch('/users/me', data).then((r) => r.data),
    onSuccess: (data) => {
      setUser(data);
      queryClient.setQueryData(['me'], data);
    },
  });
};
