import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';

import type { ProcessedVideo } from './common/interfaces';
import { getVideos } from './services/videos';
import { VideosTable } from './components/videos-table';
import styles from './app.module.css';
import { MemoizedSearchField } from './components/search-field';

export const App = () => {
  const videosRef = useRef<ProcessedVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<ProcessedVideo[]>([]);

  console.log('APP RENDER');

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
      <header className={styles.header}>
        Videos
        <Button type="primary">Add video</Button>
      </header>

      <main className={styles.main}>
        <h1>VManager Demo v0.0.1</h1>
        <MemoizedSearchField search={search} resetSearch={resetSearch} />
        <VideosTable videos={filteredVideos} />
      </main>

      <footer className={styles.footer}>VManager Demo v0.0.1</footer>
    </>
  );
};
