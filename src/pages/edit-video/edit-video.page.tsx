import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VideoForm } from '../../components/video-form';
import { useVideosState } from '../../states/videos-context';
import { ProcessedVideo } from '../../common/interfaces';
import { AppRoutes } from '../routes';
import videoService from './../../services/videos';

export const EditVideo = () => {
  const params = useParams();
  const { videos, authors, categories, editVideo, addVideo, removeVideo, moveVideoToOtherAuthor } = useVideosState();
  const [video, setVideo] = useState<ProcessedVideo>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!params?.videoId) {
      setSelectedVideo();
    }
  }, [params]);

  const setSelectedVideo = () => {
    const video = videos.find((video) => video.id === parseInt(params.videoId!));
    setVideo(video);
  };

  const handleSubmit = (updatedVideo: ProcessedVideo) => {
    const authorChanged = updatedVideo.authorId !== video?.authorId;
    if (!authorChanged) {
      videoService.editVideo(updatedVideo, authors).then(() => {
        editVideo(updatedVideo);
        navigate(`/${AppRoutes.VIDEO_LIST}`);
      });
    } else {
      const addVideoToAuthor = videoService.addVideoToAuthor(updatedVideo, authors);
      const removeVideoFromPrevAuthor = videoService.removeVideo(video!, authors);
      Promise.all([addVideoToAuthor, removeVideoFromPrevAuthor]).then(() => {
        moveVideoToOtherAuthor(updatedVideo);
        navigate(`/${AppRoutes.VIDEO_LIST}`);
      });
    }
  };

  console.log('EDIT VIDEOS');
  return (
    <>
      <h3>Edit video</h3>
      <VideoForm submit={handleSubmit} video={video} />
    </>
  );
};
