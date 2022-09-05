import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppRoutes } from '../routes';
import videoService from './../../services/videos';
import { VideoForm } from '../../components/video-form';
import { ProcessedVideo } from '../../common/interfaces';
import { useVideosState } from '../../states/videos-context';

export const EditVideo = () => {
  const params = useParams();
  const { videos, authors, editVideo, moveVideoToOtherAuthor } = useVideosState();
  const [video, setVideo] = useState<ProcessedVideo>();
  const navigate = useNavigate();

  useEffect(() => {
    const setSelectedVideo = () => {
      const video = videos.find((video) => video.id === parseInt(params.videoId!));
      setVideo(video);
    };
    if (!!params?.videoId && videos.length > 0) {
      setSelectedVideo();
    }
  }, [params, videos]);

  const handleSubmit = (updatedVideo: ProcessedVideo) => {
    const authorChanged = updatedVideo.authorId !== video?.authorId;
    if (!authorChanged) {
      videoService.editVideo(updatedVideo, authors, videos).then(() => {
        editVideo(updatedVideo);
        navigate(`/${AppRoutes.VIDEO_LIST}`);
      });
    } else {
      const addVideoToAuthor = videoService.addVideoToAuthor(updatedVideo, authors, videos);
      const removeVideoFromPrevAuthor = videoService.removeVideo(video!, authors, videos);
      Promise.all([addVideoToAuthor, removeVideoFromPrevAuthor]).then(() => {
        moveVideoToOtherAuthor(updatedVideo);
        navigate(`/${AppRoutes.VIDEO_LIST}`);
      });
    }
  };

  return (
    <>
      <h3>Edit video</h3>
      <VideoForm submit={handleSubmit} video={video} />
    </>
  );
};
