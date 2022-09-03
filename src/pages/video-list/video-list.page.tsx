import { MemoizedSearchField } from './search-field';
import { VideosTable } from './videos-table';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getVideos } from '../../services/videos';
import { ProcessedVideo } from '../../common/interfaces';

export const VideoList = () => {
  const videosRef = useRef<ProcessedVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<ProcessedVideo[]>([]);

  console.log('VideoList RENDER');

  useEffect(() => {
    getVideos().then((videos) => {
      videosRef.current = videos;
      setFilteredVideos(videosRef.current);
    });
  }, []);

  const search = useCallback((term: string) => {
    const filteredVideos = videosRef.current.filter((video) => video.name.toLowerCase().includes(term));
    setFilteredVideos(filteredVideos);
  }, []);

  const resetSearch = useCallback(() => {
    setFilteredVideos(videosRef.current);
  }, []);

  return (
    <>
      <h1>VManager Demo v0.0.1</h1>
      <MemoizedSearchField search={search} resetSearch={resetSearch} />
      <VideosTable videos={filteredVideos} />
    </>
  );
};
