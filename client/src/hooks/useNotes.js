import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

// API request helper functions
const fetchNotes = async () => {
  const { data } = await axiosInstance.get('/notes');
  return data.notes;
};

const createNoteApi = async ({ title, content }) => {
  const { data } = await axiosInstance.post('/notes', { title, content });
  return data.note;
};

const updateNoteApi = async ({ id, title, content }) => {
  const { data } = await axiosInstance.put(`/notes/${id}`, { title, content });
  return data.note;
};

const deleteNoteApi = async (id) => {
  await axiosInstance.delete(`/notes/${id}`);
};

export const useNotes = () => {
  const queryClient = useQueryClient();

  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  });

  const createMutation = useMutation({
    mutationFn: createNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error("Mutation failed");
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.error("Update mutation failed");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']});
    },
    onError: (error) => {
      console.error("Delete mutation failed");
    }
  })

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    createNote: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateNote: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteNote: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
