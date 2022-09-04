import { VideoForm } from '../../components/video-form';
import { ProcessedVideo } from '../../common/interfaces';
import videoService from '../../services/videos';
import { useVideosState } from '../../states/videos-context';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';

export const CreateVideo = () => {
  console.log('CREATE VIDEOS');
  const { categories, authors, videos, setVideos, addVideo } = useVideosState();
  const navigate = useNavigate();

  const handleSubmit = (video: ProcessedVideo) => {
    videoService.addVideoToAuthor(video, authors).then(() => {
      addVideo(video);
      navigate(`/${AppRoutes.VIDEO_LIST}`);
    });
  };

  return (
    <>
      <h3>Add Video</h3>
      <VideoForm submit={handleSubmit} />
    </>
  );
};
