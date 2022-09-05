import { useCallback, useEffect, useState } from 'react';

import { VideosTable } from './videos-table';
import { MemoizedSearchField } from './search-field';
import { ProcessedVideo } from '../../common/interfaces';
import { useVideosState } from '../../states/videos-context';

export const VideoList = () => {
  const state = useVideosState();
  const [filteredVideos, setFilteredVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    if (!!state.videos) {
      setFilteredVideos(state.videos);
    }
  }, [state.videos]);

  const search = useCallback(
    (term: string) => {
      const filteredVideos = state.videos!.filter((video) => video.name.toLowerCase().includes(term));
      setFilteredVideos(filteredVideos);
    },
    [state.videos]
  );

  const resetSearch = useCallback(() => {
    setFilteredVideos(state.videos!);
  }, [state.videos]);

  return (
    <>
      <h1>VManager Demo v0.0.1</h1>
      <MemoizedSearchField search={search} resetSearch={resetSearch} />
      <VideosTable videos={filteredVideos} />
    </>
  );
};
