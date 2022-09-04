import { Author, Category, ProcessedVideo } from '../common/interfaces';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

export type VideoState = {
  videos: ProcessedVideo[];
  authors: Author[];
  categories: Category[];
};

export type VideosContext = {
  setAuthors: Dispatch<SetStateAction<Author[]>>;
  setVideos: Dispatch<SetStateAction<ProcessedVideo[]>>;
  setCategories: Dispatch<SetStateAction<Category[]>>;
} & VideoState;

export const VideosStateContext = createContext<VideosContext | undefined>(undefined);

export const VideosStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  return (
    <VideosStateContext.Provider
      value={{
        videos,
        setVideos,
        authors,
        setAuthors,
        categories,
        setCategories,
      }}>
      {children}
    </VideosStateContext.Provider>
  );
};

export const useVideosState = () => {
  const context = useContext(VideosStateContext);
  if (context === undefined) {
    throw new Error('no');
  }
  return context;
};
