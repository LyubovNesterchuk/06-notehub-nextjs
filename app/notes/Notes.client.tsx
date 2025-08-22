'use client';

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery} from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";

import css from './Notes.module.css'
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";

import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { Toaster } from "react-hot-toast";
import Modal from "@/components/Modal/Modal";


export default function Notes() {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage: number = 12;

  
  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
  }, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", {search: searchQuery, page: currentPage}],
    queryFn: () => fetchNotes(searchQuery, currentPage, perPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        
       
        <SearchBox onChange={updateSearchQuery} />

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>

        <Toaster/>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onSuccess={closeModal} />
          </Modal>
        )}
      </header>

      {(data?.notes ?? []).length > 0 ? (
        <>
          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {data && <NoteList notes={data.notes} />}
        </>
      ) : (
        !isLoading && !isError && <p>No notes found</p>
      )}
    </div>
  );
}