import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './axios';

export const useConsultations = () =>
  useQuery({
    queryKey: ['consultations'],
    queryFn: () => api.get('/consultations').then((r) => r.data),
  });

export const useConsultation = (id) =>
  useQuery({
    queryKey: ['consultation', id],
    queryFn: () => api.get(`/consultations/${id}`).then((r) => r.data),
    enabled: !!id,
  });

export const useCreateConsultation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/consultations', data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultations'] });
    },
  });
};

export const useDownloadPdf = () =>
  useMutation({
    mutationFn: async (consultationId) => {
      const response = await api.get(`/consultations/${consultationId}/pdf`, {
        responseType: 'blob',
      });
      // Trigger browser download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const filename =
        response.headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') ||
        `questions_${consultationId}.pdf`;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });
