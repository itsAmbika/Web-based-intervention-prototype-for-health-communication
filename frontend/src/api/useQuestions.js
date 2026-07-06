import { useQuery } from '@tanstack/react-query';
import api from './axios';

export const useDiseases = () =>
  useQuery({
    queryKey: ['diseases'],
    queryFn: () => api.get('/diseases').then((r) => r.data),
    staleTime: Infinity, // diseases don't change often
  });

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/categories').then((r) => r.data),
    staleTime: Infinity,
  });

export const useQuestions = (diseaseId, stage) =>
  useQuery({
    queryKey: ['questions', diseaseId, stage],
    queryFn: () =>
      api.get('/questions', { params: { disease: diseaseId, stage } }).then((r) => r.data),
    enabled: !!diseaseId && !!stage,
    staleTime: 5 * 60 * 1000,
  });
