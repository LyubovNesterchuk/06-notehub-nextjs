import{ Note } from "@/types/notes";
import axios from "axios";


axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  },
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page = 1,
  perPage = 12
): Promise<FetchNotesResponse> =>{
  const response = await axios.get<FetchNotesResponse>("/notes", {
    ...config,
    params: { search, page, perPage },
  });
  return response.data;
}

export const createNote = async (
  newNote: Pick<Note, "title" | "content" | "tag">
): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, config);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, config);
  return response.data;
};

// export const fetchNoteById= async (noteId: number): Promise<Note> => {
//   const response = await axios.get<Note>(`/notes/${noteId}`, config);
//   return response.data;
// }
export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${noteId}`, config);
  return response.data;
};

