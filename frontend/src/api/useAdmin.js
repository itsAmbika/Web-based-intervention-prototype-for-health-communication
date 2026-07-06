import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './axios';

// ─── Questions CRUD ────────────────────────────────────────────────────────────
export const useAdminQuestions = (filters = {}) =>
  useQuery({
    queryKey: ['admin', 'questions', filters],
    queryFn: () => api.get('/admin/questions', { params: filters }).then((r) => r.data),
  });

export const useAdminQuestion = (id) =>
  useQuery({
    queryKey: ['admin', 'question', id],
    queryFn: () => api.get(`/admin/questions/${id}`).then((r) => r.data),
    enabled: !!id,
  });

export const useCreateAdminQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/admin/questions', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'questions'] }),
  });
};

export const useUpdateAdminQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => api.put(`/admin/questions/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'questions'] }),
  });
};

export const useDeleteAdminQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/admin/questions/${id}`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'questions'] });
      qc.invalidateQueries({ queryKey: ['questions'] }); // invalidate patient-facing too
    },
  });
};

// ─── Users ────────────────────────────────────────────────────────────────────
export const useAdminUsers = () =>
  useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => api.get('/admin/users').then((r) => r.data),
  });

export const useUpdateAdminUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => api.patch(`/admin/users/${id}`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });
};

// ─── Stats ────────────────────────────────────────────────────────────────────
export const useAdminStats = () =>
  useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => api.get('/admin/stats').then((r) => r.data),
  });
